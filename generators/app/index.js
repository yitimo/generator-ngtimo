'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the astonishing ' + chalk.red('generator-ngtimo') + ' generator!'
    ));
    // 一个向用户询问配置的数组 prompting方法最后要将此作为参数进行配置
    // yeoman将同步阻塞的一个个询问用户如何来配置项目
    const prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Your project name(你的项目名称)',
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      // 用户交互完成后把得到的配置设置到参数中
      this.props = props;
    });
  }
  // 从generator-generator参考过来用于生成顶级应用目录的
  default() {
    if (path.basename(this.destinationPath()) !== this.props.appName) {
      this.log(
        '发现你不是在 ' + this.props.appName + ' 目录下构建\n' +
        '我将主动创建此目录.(created folder with app name)'
      );
      mkdirp(this.props.appName);
      this.destinationRoot(this.destinationPath(this.props.appName));
    }
  }
  /**
   * 告诉yeoman要如何写模板
   */
  writing() {
    /**
     * 方式一(直接拷贝):
     * this.fs.copy(
     *  this.templatePath('模板位置'),
     *  this.destinationPath('目标位置')
     * );
     * 方式二(传入参数渲染模板):
     * this.fs.copyTpl(
     *  this.templatePath('模板位置'),
     *  this.destinationPath('目标位置'),
     *  {
     *    参数名: 值
     *  }
     * );
     */
    this.fs.copy(
      this.templatePath('common/**'),
      this.destinationPath()
    );
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_index_html'),
      this.destinationPath('src/index.html'),
      {
        appName: this.props.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package_json'),
      this.destinationPath('package.json'),
      {
        appName: this.props.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README_MD'),
      this.destinationPath('README.MD'),
      {
        appName: this.props.appName
      }
    );
  }
  // 构建完成后执行安装命令 这里去掉了bower保留npm
  install() {
    this.installDependencies({bower: false});
  }
};
