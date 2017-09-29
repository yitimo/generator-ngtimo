'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
// Const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'You are using ' + chalk.red('generator-ngtimo') + ' to make a module !'
    ));

    this.option('name', {
      type: String,
      required: false,
      desc: 'Module name'
    });

    this.option('path', {
      type: String,
      required: false,
      desc: 'Base path'
    });

    this.option('route', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Include router and pages'
    });

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
      type: 'input',
      name: 'routePages',
      message: 'names of router pages(split with ",") eg: (page1,page2)? (it will only work when added --route option)',
      default: ''
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
      this.templatePath('_index_ts'),
      this.destinationPath(`index.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_module_ts'),
      this.destinationPath(`${this.props.moduleName}.module.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.options.route,
        pages: this.props.routePages.split(',')
      }
    );
    this.fs.copyTpl(
      this.templatePath('_service_ts'),
      this.destinationPath(`${this.props.moduleName}.service.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_component_ts'),
      this.destinationPath(`${this.props.moduleName}.component.ts`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.options.route
      }
    );
    this.fs.copy(
      this.templatePath('_component_css'),
      this.destinationPath(`${this.props.moduleName}.component.css`)
    );
    this.fs.copyTpl(
      this.templatePath('_component_html'),
      this.destinationPath(`${this.props.moduleName}.component.html`),
      {
        ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
        moduleName: this.props.moduleName,
        needRoute: this.options.route
      }
    );
    if (this.options.route) {
      let pages = this.props.routePages.split(',');
      this.fs.copyTpl(
        this.templatePath('_route_ts'),
        this.destinationPath(`${this.props.moduleName}.route.ts`),
        {
          ModuleName: this.props.moduleName[0].toUpperCase() + this.props.moduleName.slice(1),
          moduleName: this.props.moduleName,
          pages: pages
        }
      );
      let dpath = this.destinationPath();
      for (let page of pages) {
        this.composeWith(require.resolve('../component'), {
          name: page,
          path: dpath,
          inline: false,
          service: false
        });
      }
    }
  }
};
