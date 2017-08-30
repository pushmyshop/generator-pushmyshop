var Generator = require('yeoman-generator');
var path = require('path');
const { spawn } = require('child_process');

var files = require('./files.json');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('compagnyName', {
      type: String,
      required: true
    });
    this.argument('destWrite', {
      type: String,
      required: true
    });
  }

  information() {
    this.log('I\'ll generate wep app with this informations :');
    this.log('Name of compagny is ' + this.options.compagnyName);
    this.log('Sources of projects are in folder ' + path.join(this.options.destWrite, this.options.compagnyName));
  }

  writeSrcApp() {
    for (var i = 0; i < files.static.length; i++) {
      var src = path.join(
        this.sourceRoot(),
        files.static[i]);
      var dest = path.join(
        this.options.destWrite,
        this.options.compagnyName,
        files.static[i])
      console.log('copy ' + src + ' to' + dest);
      this.fs.copy(
        this.templatePath(src),
        this.destinationPath(dest)
      );
    }
    for (var i = 0; i < files.templates.length; i++) {
      var src = path.join(
        this.sourceRoot(),
        files.templates[i]);
      var dest = path.join(
        this.options.destWrite,
        this.options.compagnyName,
        files.templates[i].replace(/\/_/g, "/"))
      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(dest),
        { compagnyName: this.options.compagnyName }
      );
    };
  }

  runNpm() {
    const npm = spawn(
      'npm',
      ['install'],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });

    npm.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
  }

  buildProdApplication()  {
    const ng = spawn(
      'ng',
      ['build','--prod'],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });

    ng.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
  }
};
