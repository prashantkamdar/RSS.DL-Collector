var nconf = require('nconf');
nconf.file({
    file: __dirname + '/config.json'
});
var SceneSites = nconf.get('SceneSites');
var parsesite = require('./parsesite');
var db = require('./db');

db.checkConnected(function() {
    SceneSites.forEach(function(scenesite) {
        parsesite.downloadFeed(scenesite, function(data) {
            console.log(scenesite.Name + ": " + data.title);
            db.insert(data);
        });
    });
});