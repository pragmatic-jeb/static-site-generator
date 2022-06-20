//todo
//jQuery
//frameworks
//icon libraries
//animation libraries
//slickjs
//select2



const FRAMEWORKS = [
    {
        key: "bootstrap",
        name: "Bootstrap",
        value: "bootstrap"
    },
    {
        key: "flexboxgrid",
        name: "Flexbox Grid",
        value: "flexboxgrid"
    },
    {
        key: "tailwind",
        name: "Tailwind",
        value: "tailwind"
    }
];

const CSS_LIBS = [
    {
        key: "animatecss",
        name: "Animate.css",
        value: "animatecss"
    },
    {
        key: "fontawesome",
        name: "Font Awesome",
        value: "fontawesome"
    }
]

const JS_LIBS = [
    {
        key: "slickjs",
        name: "SlickJS",
        value: "slickjs"
    },
    {
        key: "select2",
        name: "Select2",
        value: "select2"
    }
];



const FILES_TO_COPY = [
    './webpack.config.js',
    './webpack.helper.js',
    './src/js/index.js',
    './src/js/components/test.js',

    
    './src/scss/main.scss',
    './src/scss/components/_test.scss',
    './src/scss/core/_mixins.scss',
    './src/scss/core/_reset.scss',
    './src/scss/_variables.scss',


    './src/pages/index.html',
    './src/pages/test.html',
    './src/pages/test/index.html',

    './src/components/header.html',
    './src/components/footer.html',
];

const ENVDEPENDANCIES = {
    "glob": "^8.0.3",
    "webpack":"^5.73.0",
    "webpack-cli":"^4.10.0",
    "sass-loader":"^13.0.0",
    "sass":"^1.52.0",
    "html-webpack-plugin":"^5.5.0",
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "autoprefixer": "^10.3.6",
    "babel-loader": "^8.2.2",
    "browser-sync": "^2.27.5",
    "browser-sync-webpack-plugin": "^2.3.0",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^9.0.1",
    "css-loader": "^6.3.0",
    "cssnano": "^5.0.8",
    "fibers": "^5.0.0",
    "file-loader": "^6.2.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.2",
    "image-webpack-loader": "^8.0.1",
    "jsonminify": "^0.4.1",
    "mini-css-extract-plugin": "^2.3.0",
    "postcss-loader": "^6.1.1",
    "webpack-dev-server": "^4.3.0",
    "webpack-subresource-integrity": "^5.0.0",
    "webpackbar": "^4.0.0"
};

exports.ENVDEPENDANCIES = ENVDEPENDANCIES;
exports.FRAMEWORKS = FRAMEWORKS;
exports.CSS_LIBS = CSS_LIBS;
exports.JS_LIBS = JS_LIBS;
exports.FILES_TO_COPY = FILES_TO_COPY;


