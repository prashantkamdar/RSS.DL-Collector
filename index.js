var nconf = require('nconf');
nconf.file({ file: __dirname + '/config.json' });
var SceneSites = nconf.get('SceneSites');
var parsesite = require('./parsesite');

SceneSites.forEach(function(scenesite){
	parsesite.downloadFeed(scenesite, function(data){
		console.log(scenesite.Name + ": " + data.title);
	});
});