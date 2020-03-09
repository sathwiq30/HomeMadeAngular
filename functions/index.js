const functions = require('firebase-functions');
var express = require('express'),
    app = express();


app.get('/', (req, res)=> {
        res.send('hi')
    });
exports.app = functions.https.onRequest(app);