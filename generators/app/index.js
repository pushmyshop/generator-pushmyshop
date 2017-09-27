var Generator = require('yeoman-generator');
var path = require('path');
var files = require('./files.json');
var AWS = require('aws-sdk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    console.log(this.argument);
    this.argument('destWrite', {
      type: String,
      required: true
    });
    this.argument('compagnyId', {
      type: Number,
      required: true
    });
    this.argument('compagnyName', {
      type: String,
      required: true
    });
  }

  information() {
    this.log('I\'ll generate wep app with this informations :');
    this.log('Name of compagny is ' + this.options.compagnyName);
    this.log('Id of compagny is ' + this.options.compagnyId);
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
        {
          compagnyName: this.options.compagnyName,
          compagnyId: this.options.compagnyId,
        }
      );
    };
  }

  install() {
    var route53 = new AWS.Route53();
    var params = {ChangeBatch: { Changes: [{Action: "CREATE", ResourceRecordSet: { Name: this.options.compagnyName.replace(/ /g,'')+ ".pushmyshop.com",ResourceRecords: [{Value: "52.19.54.10"}],TTL: 60,Type: "A"}}], Comment: "Add new entry for compagny :"+this.options.compagnyName},HostedZoneId: "ZTMTVN9GNFA4M" };
    route53.changeResourceRecordSets(params, function(err, data) {
    	if (err) console.log(err, err.stack); // an error occurred
   	else     console.log(data);           // successful response
    });
    this.spawnCommandSync(
      'npm',
      ['install'],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });
    this.spawnCommandSync(
      'ng',this.spawnCommand(
      ['build', '--prod','--aot','--build-optimizer'],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });
    this.spawnCommandSync(
      'docker',
      ['build', '-t', 'pushmyshop/compagny' + this.options.compagnyId, '.'],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });
    this.spawnCommandSync(
      'docker',
      ['run', '-d', '-e', 'VIRTUAL_HOST=' + this.options.compagnyName.replace(/ /g,'')+'.pushmyshop.com','--name',this.options.compagnyName.replace(/ /g,'')+'.pushmyshop.com','--net','pushmyshopdocker_pushmyshop', 'pushmyshop/compagny' + this.options.compagnyId],
      {
        cwd: path.join(
          this.options.destWrite,
          this.options.compagnyName)
      });
  }
};
