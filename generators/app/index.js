'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const { CSS_LIBS, JS_LIBS, FRAMEWORKS, FILES_TO_COPY } = require('./config');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the \n ${chalk.red('Pragmatic Digital')}\n static site generator!`
      )
    );

    
    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the project?',
      },
      {
        type: "checkbox",
        name: 'includeFrameworks',
        message: "Select which frameworks you'd like to include:",
        choices: FRAMEWORKS
      },
      {
        type: "checkbox",
        name: 'includeCSSlibs',
        message: "Select which frameworks you'd like to include:",
        choices: CSS_LIBS
      },

      {
        type: "checkbox",
        name: 'includeJSlibs',
        message: "Select which frameworks you'd like to include:",
        choices: JS_LIBS
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    console.log(this.props);
    const pkgJson = {
          dependencies: {},
          devDependencies: {},
    };

    const packageTemplate = {
      appname:this.props.projectName,
      date: new Date().toISOString().split('T')[0],
    }


    if (this.props.includeFrameworks.includes('bootstrap')) {
      pkgJson.dependencies = {
        'bootstrap': '^4.4.0',
        'popper.js': '^1.15.0',
        'jquery': '^3.4.1',
      };
    }


    for(let file of FILES_TO_COPY){
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }

    

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);




  }

  install() {
    this.installDependencies();
  }
};
