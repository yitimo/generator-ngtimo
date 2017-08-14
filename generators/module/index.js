'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'You are using ' + chalk.red('generator-ngtimo') + ' to make a module !'
    ));

    const prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Name of your new module?'
    }, {
      type: 'input',
      name: 'basePath',
      message: 'Where to create new module? default in current folder',
      default: '.'
    }, {
      type: 'confirm',
      name: 'needRoute',
      message: 'Should the new module include a child route? (it will add a child route and default page)',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    this.log(`Create folder ${this.props.basePath}/${this.props.moduleName}`);
    mkdirp(`${this.props.basePath}/${this.props.moduleName}`);
    this.destinationRoot(this.destinationPath(`${this.props.basePath}/${this.props.moduleName}`));
  }

  writing() {
    // 包含 module.ts component.ts route.ts service.ts default.page
    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath(`index.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_module.ts'),
      this.destinationPath(`${this.props.moduleName}.module.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.props.needRoute
      }
    );
    this.fs.copyTpl(
      this.templatePath('_service.ts'),
      this.destinationPath(`${this.props.moduleName}.service.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_component.ts'),
      this.destinationPath(`${this.props.moduleName}.component.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.props.needRoute
      }
    );
    this.fs.copy(
      this.templatePath('_component.css'),
      this.destinationPath(`${this.props.moduleName}.component.css`)
    );
    this.fs.copyTpl(
      this.templatePath('_component.html'),
      this.destinationPath(`${this.props.moduleName}.component.html`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.props.needRoute
      }
    );
    if (this.props.needRoute) {
      this.fs.copyTpl(
        this.templatePath('_route.ts'),
        this.destinationPath(`${this.props.moduleName}.route.ts`),
        {
          ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
          moduleName: this.props.moduleName
        }
      );
      this.fs.copy(
        this.templatePath('_defaultPage/**'),
        this.destinationPath(`default`)
      );
    }
  }
};
