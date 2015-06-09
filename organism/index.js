'use strict';
var util = require('util');
var path = require('path');
var s = require("underscore.string");
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('modulename', { type: String, required: false });
  this.argument('description', { type: String, required: false });
  this.pkg = require('../package.json');
};

util.inherits(Generator, yeoman.generators.Base);



Generator.prototype.promptConfig = function promptConfig() {
  var cb = this.async(),
    welcomeMsg = 'generator-atomic version: ' + this.pkg.version,
    prompts;

  console.log(welcomeMsg);

  prompts = [
    {
      name: 'modulename',
      message: 'Name your organism'
    },
    {
      name: 'description',
      message: 'Describe your organism'
    },
    {
      name: 'author',
      message: 'Whats your name? (the author)',
      store: true
    }
  ];

  if(this.modulename) {
    prompts = [];
  }

  this.prompt(prompts, function(props) {
    this.modulename = props.modulename || this.modulename;
    this.author = props.author || this.config.get('author');
    this.description = props.description || this.description || 'Organism description here';

    this.appname   = this.config.get('appname');
    this.projectName = this.config.get('projectName');
    this.namespace = this.config.get('namespace');

    this.config.set('author', this.author);

    this.config.save();

    cb();
  }.bind(this));
};

Generator.prototype.sourceFiles = function sourceFiles() {

  this.copy('module.jade', 'app/3_organisms/'+ this.modulename +'/'+ this.modulename +'.jade');
  this.copy('_module.jade', 'app/3_organisms/'+ this.modulename +'/_'+ this.modulename +'.jade');
  this.copy('module.less', 'app/3_organisms/'+ this.modulename +'/'+ this.modulename +'.less');
  this.copy('module.js', 'app/3_organisms/'+ this.modulename +'/'+ this.modulename +'.js');

};

Generator.prototype.install = function() {
  /*if (this.options['skip-install']) {
    return;
  }*/

  this.spawnCommand('grunt', ['injector']);

  //var done = this.async();
  /*this.installDependencies({
    //skipMessage: this.options['skip-install-message'],
    //skipInstall: this.options['skip-install'],
    //callback: done
  });*/
};
