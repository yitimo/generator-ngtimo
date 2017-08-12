'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the astonishing ' + chalk.red('generator-ngtimo') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Your project name(你的项目名称)',
      default: this.appname // Default to current folder name
    }, {
      type: 'confirm',
      name: 'needCoreModule',
      message: 'Would you like to add a CoreModule?(要自动创建一个CoreModule吗)',
      default: true
    }, {
      type: 'confirm',
      name: 'needSharedModule',
      message: 'Would you like to add a SharedModule?(要自动创建一个SharedModule吗)',
      default: true
    }, {
      type: 'confirm',
      name: 'needMaterial',
      message: 'Would you like to add Material2?(要整合Material2吗)',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('config/**'),
      this.destinationPath(this.props.appName + '/config')
    );
    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath(this.props.appName + '/src')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath(this.props.appName + '/.gitignore')
    );
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath(this.props.appName + '/tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('tsconfig.webpack.json'),
      this.destinationPath(this.props.appName + '/tsconfig.webpack.json')
    );
    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath(this.props.appName + '/tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath(this.props.appName + '/src/index.html'),
      {
        appName: this.props.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.props.appName + '/package.json'),
      {
        appName: this.props.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.MD'),
      this.destinationPath(this.props.appName + '/README.MD'),
      {
        appName: this.props.appName
      }
    );
    // This.fs.copyTpl(this.templatePath(''));
  }
  // 构建完成后执行安装命令 这里去掉了bower保留npm
  // install() {
  //   this.installDependencies({bower: false});
  // }
};
