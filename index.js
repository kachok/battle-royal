var express = require('express');
var app = express();

var API_KEY = process.env.API_KEY || 'mega-secret-key-here';

var mdb;
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('battle royale is up and running!');
});


app.get('/report', function(request, response) {
    if (API_KEY === request.query.API_KEY) {
        var collection = mdb.collection('stats');


        var data = {
            timestamp: Date.now(),
            value: request.query.data
        };

        collection.insert(data, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted document into the "stats" collection.');
            }
        });

        response.send('saved');
    } else {
        response.send('denied');
    }
});



var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/battle-royale';

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        mdb = db;

        app.listen(app.get('port'), function() {
            console.log('Node app is running on port', app.get('port'));
        });
    }
});
