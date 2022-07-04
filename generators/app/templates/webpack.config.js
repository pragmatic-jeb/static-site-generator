const path = require("path");
const minJSON = require("jsonminify");
const webpack = require("webpack");
const fs = require('fs');
const package = require('./package.json');


const glob = require("glob");
const directory = './src/pages';

const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

const plugins = {
  progress: require("webpackbar"),
  clean: (() => {
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    return CleanWebpackPlugin;
  })(),
  extractCSS: require("mini-css-extract-plugin"),
  sync: require("browser-sync-webpack-plugin"),
  html: require("html-webpack-plugin"),
  copy: require("copy-webpack-plugin"),
  sri: SubresourceIntegrityPlugin,
};

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === "production";

  let config = {
    context: path.resolve(__dirname, "src"),

    entry: {
      //vendor: ["./styles/vendor.scss", "./scripts/vendor.js"],
      app: ["./scss/main.scss", "./js/index.js"],
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
      filename: "assets/js/[name].js",
      crossOriginLoading: "anonymous",
    },

    module: {
      rules: [
        {
          test: /\.((s[ac]|c)ss)$/,
          use: [
            {
              loader: plugins.extractCSS.loader,
              options: {
                publicPath: "../", // use relative path for everything in CSS
              },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !isProduction,
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    require("autoprefixer")(),
                    ...(isProduction
                      ? [
                          require("cssnano")({
                            preset: [
                              "default",
                              {
                                minifySelectors: false,
                              },
                            ],
                          }),
                        ]
                      : []),
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  fiber: require("fibers"),
                  outputStyle: "expanded",
                  sourceMap: !isProduction,
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /fonts/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                // publicPath: '..' // use relative path
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                disable: !isProduction,
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /images/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
                // publicPath: '../fonts/' // use relative path
              },
            },
          ],
        },
        {
          test: /\.html$/,
          include: path.join(__dirname, 'src/components'),
          use: {
            loader: "html-loader",
            options: {
              // interpolate: true
              minimize: {
                removeComments:true
              }
            }
          },
        },
      ],
    },

    devServer: {
      port: 8080,
      client: {
        overlay: {
          warnings: true,
          errors: true,
        },
      },
    },

    plugins: (() => {
      let common = [new plugins.extractCSS({
        filename: "assets/css/[name].css",
      }),
      new plugins.progress({
        color: "#5C95EE",
      }),
      ];

      let res = glob.sync(directory + '/**/*.html');

      let html = '<ul>';
      let c = 0;
      for(const file of res){
        if (!fs.statSync(file).isDirectory()) {
          
          let filename = path.basename(file);

          let chunkName = filename.replace('.', '');

          let filePath = file.replace('/src', '');
          common.push(new plugins.html({
              template: filePath,
              filename: filePath,
              chunks:[chunkName],
              minify: {
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
              },
            }))

            html += "<li><a href="+filePath+">"+filename+"</li>\n";
            c++;
        }
      }


      //add landing page html file
      html += '</ul>';
      console.log(package);
      common.push(new plugins.html({
        title: package.appname+' - Landing page',
        myPageHeader: package.appname+' project has ' +c+' pages',
        listHTML:html,
        template: './index.html',
        filename: './index.html',
        chunks:['landingIndex'],
        minify: {
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
        },
      }))

      


      common.push( 
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }));


      const production = [
        new plugins.clean(),
        new SubresourceIntegrityPlugin({
          hashFuncNames: ["sha384"],
          enabled: true,
        }),
      ];

      const development = [
        new plugins.sync(
          {
            host: "localhost",
            port: 9090,
            proxy: "http://localhost:8080/",
          },
          {
            reload: false,
          }
        ),
      ];

      return isProduction
        ? common.concat(production)
        : common.concat(development);
    })(),
    // uncomment in development mode

    // devtool: (() => {
    //   return "source-map";
    // })(),

    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "~": path.resolve(__dirname, "src/js/"),
      },
    },

    stats: "errors-only",
  };

  return config;
};