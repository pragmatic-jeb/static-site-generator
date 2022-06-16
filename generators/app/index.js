'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const { API_URL, MAX_THREADS, FRAMEWORKS } = require('./config');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(API_URL);
    this.log(
      yosay(
        `Welcome to the fantabulous ${chalk.red('generator-pd-static-site')} generator!`
      )
    );

    
    const prompts = [
      {
        type: 'confirm',
        name: 'includeJquery',
        message: 'Would you like to include jQuery?',
        default: true
      },
      {
        type: "checkbox",
        name: 'includeFrameworks',
        message: "Select which frameworks you'd like to include:",
        choices: FRAMEWORKS,
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
