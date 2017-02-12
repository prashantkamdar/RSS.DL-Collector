//db/index.js
var mongoClient = require('mongodb').MongoClient;
var mongourl = "mongodb://localhost:27017/SceneDL";
var mongoDbObj;

function getDB(callback) {
    if (!mongoDbObj) {
        mongoClient.connect(mongourl, function(err, db) {
            if (err) {
                console.log(err);
            } else {
                mongoDbObj = {
                    db: db,
                    sceneDLDB: db.collection("rss")
                };
                return callback(null, mongoDbObj);
            }
        });
    } else {
        return callback(null, mongoDbObj);
    }
};

function checkConnected(callback) {
    getDB(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to db!");
            return callback();
        }
    });
};

function search(searchQuery) {
    getDB(function(err) {
        if (err) {
            console.log(err);
        } else {
            mongoDbObj.sceneDLDB.find({
                "site": new RegExp(searchQuery)
            }).toArray(function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        }
    });
};

function searchAll() {
    getDB(function(err) {
        if (err) {
            console.log(err);
        } else {
            mongoDbObj.sceneDLDB.find().toArray(function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        }
    });
};

function insert(item) {
    getDB(function(err) {
        if (err) {
            console.log(err);
        } else {
            mongoDbObj.sceneDLDB.insert(item, function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        };
    });
}

module.exports = {
    checkConnected: function(callback) {
        checkConnected(callback);
    },
    searchAll: function() {
        searchAll();
    },
    search: function(searchQuery) {
        search(searchQuery);
    },
    insert: function(item) {
        insert(item);
    }
};