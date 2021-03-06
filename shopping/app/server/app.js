var express = require('express'),
    app = module.exports = express(),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = 3000

app.use(express.static('./client'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/client', express.static(path.join(__dirname, 'client')));
// app.use('/client', express.static('./client'));



require("./api/memberApi");
require("./api/loginApi");



// db configuration
var db = 'mongodb://127.0.0.1/north';
// mongoose.connect(db, { useMongoClient: true });
mongoose.connect(db);
var con = mongoose.connection;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function() {
    console.log("connection created");
});




app.listen(port, function() {
    console.log(`App listening on port ${port}`);
})