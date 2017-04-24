var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static(__dirname));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
});