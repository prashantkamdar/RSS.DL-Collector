var request = require('request');
var FeedParser = require('feedparser');

function downloadFeed(scenesite, callback) {

  var req = request(scenesite.RSS);
  var feedparser = new FeedParser();

  req.on('error', function (error) {
    console.log("Error:" + error);
  });

  req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'));
    }
    else {
      stream.pipe(feedparser);
    }
  });

  feedparser.on('error', function (error) {
    console.log("Error:" + error);
  });

  feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {
      return callback(item);
    }
  });

}

module.exports = {
  downloadFeed: function(scenesite, callback){
    downloadFeed(scenesite, callback);
  }
};