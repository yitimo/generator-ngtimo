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
      message: 'your project name',
      default: path.basename(this.destinationPath())
    }, {
      type: 'list',
      name: 'npmOrYarn',
      message: 'use npm or yarn',
      choices: [{
        name: 'npm',
        value: 'npm',
        checked: false
      }, {
        name: 'yarn only',
        value: 'yarn',
        checked: true
      }]
    }, {
      type: 'confirm',
      name: 'useBaseUrl',
      message: 'use pushState or not (是否使用 pushState 路由)',
      default: false
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
        'not inside ' + this.props.appName + '.\n' +
        'create folder with the given app name.'
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
    console.log(this.props.npmOrYarn);
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
        appName: this.props.appName,
        useBaseUrl: this.props.useBaseUrl
      }
    );
    this.fs.copyTpl(
      this.templatePath('_approute_'),
      this.destinationPath('src/app/app.route.ts'),
      {
        useBaseUrl: this.props.useBaseUrl
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package_json'),
      this.destinationPath('package.json'),
      {
        appName: this.props.appName,
        npmOrYarn: this.props.npmOrYarn
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README_MD'),
      this.destinationPath('README.MD'),
      {
        appName: this.props.appName,
        npmOrYarn: this.props.npmOrYarn === 'yarn'
      }
    );
  }
  // 构建完成后执行安装命令 这里去掉了bower保留npm
  install() {
    console.log(this.props.npmOrYarn);
    if (this.props.npmOrYarn === 'yarn') {
      console.log('use yarn only !!!!!');
      this.installDependencies({
        yarn: {force: true},
        npm: false
      });
    } else {
      console.log('use npm ~~~~~~~~~');
      this.installDependencies({bower: false, npm: true});
    }
  }
};

// Format name (when has '-' inside)
// function nameFormat(name) {
//   let rs = '';
//   let pieces = name.split('-');
//   for (let piece of pieces) {
//     rs += piece.slice(0, 1, piece[0].toUpperCase);
//   }
//   return rs;
// }
