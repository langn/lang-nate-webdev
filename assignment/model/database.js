var q = require('q');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MONGO_USER){ // check if running remotely
    var username = process.env.MONGO_USER; // get from environment
    var password = process.env.MONGO_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds013192.mlab.com:13192/heroku_q9g26xqw'; // user yours
}

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;
