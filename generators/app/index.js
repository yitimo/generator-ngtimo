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
    }, {
      type: 'confirm',
      name: 'addCommon',
      message: 'Would you like to add some common code(include CoreModule, SharedModule, Router)?\n(要自动创建额外的常用内容吗, 包含了核心模块、共享模块和路由能力)',
      default: true
    }, {
      type: 'confirm',
      name: 'needMaterial',
      message: 'Would you like to add Material2(it will be added as a part of the SharedModule)?\n(要整合Material2吗, 会自动包含在SharedModule里)',
      default: true
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
      this.templatePath('config/**'),
      this.destinationPath('config')
    );
    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath('src')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('tsconfig.webpack.json'),
      this.destinationPath('tsconfig.webpack.json')
    );
    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html'),
      {
        appName: this.props.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        appName: this.props.appName,
        needMaterial: this.props.needMaterial
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.MD'),
      this.destinationPath('README.MD'),
      {
        appName: this.props.appName
      }
    );
    if (this.props.addCommon) {
      this.fs.copy(
        this.templatePath('_core.module'),
        this.destinationPath('src/app/-core')
      );
      this.fs.copy(
        this.templatePath('_shared.module'),
        this.destinationPath('src/app/-shared')
      );
      this.fs.copyTpl(
        this.templatePath('_shared.module.ts'),
        this.destinationPath('src/app/-shared/shared.module.ts'),
        {
          needMaterial: this.props.needMaterial
        }
      );
    }
    this.fs.copyTpl(
      this.templatePath('_app.module.ts'),
      this.destinationPath('src/app/app.module.ts'),
      {
        addCommon: this.props.addCommon
      }
    );
    this.fs.copyTpl(
      this.templatePath('_app.component.ts'),
      this.destinationPath('src/app/app.component.ts'),
      {
        addCommon: this.props.addCommon
      }
    );
    this.fs.copyTpl(
      this.templatePath('_app.route.ts'),
      this.destinationPath('src/app/app.route.ts'),
      {
        addCommon: this.props.addCommon
      }
    );
  }
  // 构建完成后执行安装命令 这里去掉了bower保留npm
  install() {
    this.installDependencies({bower: false});
  }
};
