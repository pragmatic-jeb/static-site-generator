"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const {
  CSS_LIBS,
  JS_LIBS,
  FRAMEWORKS,
  FILES_TO_COPY,
  ENVDEPENDANCIES
} = require("./config");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the \n ${chalk.red(
          "Pragmatic Digital"
        )}\n static site generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "What is the name of the project?"
      },
      {
        type: "checkbox",
        name: "includeFrameworks",
        message: "Select which frameworks you'd like to include:",
        choices: FRAMEWORKS
      },
      {
        type: "checkbox",
        name: "includeCSSlibs",
        message: "Select which frameworks you'd like to include:",
        choices: CSS_LIBS
      },

      {
        type: "checkbox",
        name: "includeJSlibs",
        message: "Select which frameworks you'd like to include:",
        choices: JS_LIBS
      }
      // {
      //   type: "confirm",
      //   name: "exampleContent",
      //   message: "Would you like to include sample templates and modules?"
      // }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.props);

    // Package.json object
    const pkgJson = {
      appname: this.props.projectName,
      date: new Date().toISOString().split("T")[0],
      dependencies: {},
      devDependencies: ENVDEPENDANCIES,
      scripts: {
        serve: "webpack-dev-server --progress  --mode development",
        build: "webpack --progress  --mode production",
        prepare: "husky install" // This will install husky and auto allow git hooks when npm install is ran
      }
    };

    /*
     *
     * Frameworks
     *
     */

    let cssImports = ``;
    // If the user includes bootstrap include dependancies
    if (this.props.includeFrameworks.includes("bootstrap")) {
      pkgJson.dependencies = {
        bootstrap: "^4.4.0",
        "popper.js": "^1.15.0",
        jquery: "^3.4.1"
      };
      // Include relevant stuff
      cssImports += `\n@import 'bootstrap';`;
    }

    if (this.props.includeFrameworks.includes("tailwind")) {
      // Include tailwind config in dependancies
      pkgJson.devDependencies.tailwindcss = "^3.1.3";
      // Move file to directory
      this.fs.copy(
        this.templatePath("./tailwind.config.js"),
        this.destinationPath("./tailwind.config.js")
      );

      // CssImports += `\n@import 'bootstrap';`;
    }

    if (this.props.includeFrameworks.includes("flexboxgrid")) {
      pkgJson.dependencies = {
        flexboxgrid: "^6.3.1"
      };

      cssImports += `\n@import 'flexboxgrid';`;
    }

    /*
     *
     * CSS Libs
     *
     */

    // if animatecss is in include libs include the dependancies
    if (this.props.includeCSSlibs.includes("animatecss")) {
      pkgJson.dependencies["animate.css"] = "^4.1.1";
      cssImports += `\n@import 'animate.css';`;
    }

    // If fontawesome is in include libs include the dependancies
    if (this.props.includeCSSlibs.includes("fontawesome")) {
      pkgJson.dependencies["@fortawesome/fontawesome-free"] = "^6.1.1";
      cssImports += `\n@import '@fortawesome/fontawesome-free/scss/fontawesome.scss';`;
    }

    /*
     *
     * JS Libs
     *
     */

    // if select2 is in include libs include the dependancies
    if (this.props.includeJSlibs.includes("select2")) {
      pkgJson.dependencies.select2 = "^4.1.0-rc.0";
      cssImports += `\n@import 'select2';`;
    }

    // If slickjs is in include libs include the dependancies
    if (this.props.includeJSlibs.includes("slickjs")) {
      pkgJson.dependencies["slick-carousel"] = "^1.8.1";
      cssImports += `\n@import 'slick-carousel/slick/slick';`;
    }

    // Include core files that are required everytime
    for (let file of FILES_TO_COPY) {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    }

    // Write scss imports to file
    this.fs.append("./src/scss/main.scss", cssImports);

    // Write final json object to package.json
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  install() {
    this.installDependencies();
  }
};
