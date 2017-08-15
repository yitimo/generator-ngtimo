'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'You are using ' + chalk.red('generator-ngtimo') + ' to make a component !'
    ));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Name of your new component?'
    }, {
      type: 'input',
      name: 'basePath',
      message: 'Where to create new module? default in current folder',
      default: '.'
    }, {
      type: 'confirm',
      name: 'needInline',
      message: 'Should the new component use inline template?',
      default: false
    }, {
      type: 'confirm',
      name: 'needService',
      message: 'Should the new component include a service?',
      default: false
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    this.log(`Create folder ${this.props.basePath}/${this.props.componentName}`);
    mkdirp(`${this.props.basePath}/${this.props.componentName}`);
    this.destinationRoot(this.destinationPath(`${this.props.basePath}/${this.props.componentName}`));
  }

  writing() {
    // 包含 module.ts component.ts route.ts service.ts default.page
    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath(`index.ts`),
      {
        needService: this.props.needService,
        ComponentName: this.props.componentName[0].toUpperCase() + this.props.componentName.slice(1),
        componentName: this.props.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_component.ts'),
      this.destinationPath(`${this.props.componentName}.component.ts`),
      {
        needInline: this.props.needInline,
        needService: this.props.needService,
        ComponentName: this.props.componentName[0].toUpperCase() + this.props.componentName.slice(1),
        componentName: this.props.componentName
      }
    );
    if (this.props.needService) {
      this.fs.copyTpl(
        this.templatePath('_service.ts'),
        this.destinationPath(`${this.props.componentName}.service.ts`),
        {
          ComponentName: this.props.componentName[0].toUpperCase() + this.props.componentName.slice(1),
          componentName: this.props.componentName
        }
      );
    }
    if (!this.props.needInline) {
      this.fs.copy(
        this.templatePath('_component.css'),
        this.destinationPath(`${this.props.componentName}.component.css`)
      );
      this.fs.copyTpl(
        this.templatePath('_component.html'),
        this.destinationPath(`${this.props.componentName}.component.html`),
        {
          ComponentName: this.props.componentName[0].toUpperCase() + this.props.componentName.slice(1),
          componentName: this.props.componentName
        }
      );
    }
  }
};
