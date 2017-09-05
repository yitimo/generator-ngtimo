'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');
const _ = require('lodash');
const extend = require('deep-extend');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'You are using ' + chalk.red('generator-ngtimo') + ' to make an npm package !'
    ));

    this.option('name', {
      type: String,
      required: false,
      desc: 'Component name'
    });

    let prompts = [];

    if (this.options.name === undefined) {
      prompts.push({
        type: 'input',
        name: 'packageName',
        message: 'Name of your new package?'
      });
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
      if (this.options.name) {
        this.props.packageName = this.options.name;
      }
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.componentName) {
      this.log(`Create folder ${this.props.basePath}/${this.props.componentName}`);
      mkdirp(`${this.props.basePath}/${this.props.componentName}`);
      this.destinationRoot(this.destinationPath(`${this.props.basePath}/${this.props.componentName}`));
    }
    const readmeTpl = _.template(this.fs.read(this.templatePath('README')));
    this.composeWith(require.resolve('generator-node/generators/app'), {
      boilerplate: false,
      name: this.props.name,
      projectRoot: 'generators',
      skipInstall: this.options.skipInstall,
      readme: readmeTpl({
        packageName: this.props.packageName
      })
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    extend(pkg, {
      dependencies: {
        //
      },
      devDependencies: {
        //
      }
    });
    pkg.keywords = pkg.keywords || [];

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // 以上都只是写一个package.json和README.md
    // 开始copy模板
  }
};
