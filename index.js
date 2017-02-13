var nconf = require('nconf');
nconf.file({
    file: __dirname + '/config.json'
});
var replaceall = require('replaceall');
var SceneSites = nconf.get('SceneSites');
var parsesite = require('./parsesite');
var db = require('./db');

db.checkConnected(function() {
    SceneSites.forEach(function(scenesite) {
        parsesite.downloadFeed(scenesite, function(data) {
            try {
                db.insertIfNotExists({
                    "site": scenesite.Name,
                    "title": replaceall(" ", ".", data.title),
                    "date": data.date
                });                
            } catch (err) {
                console.log(err);
            }
        });
    });
});