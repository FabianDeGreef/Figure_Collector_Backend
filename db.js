var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/figures',{ useNewUrlParser: true,useUnifiedTopology: true }, function () {
	console.log('mongoose connected');
});
module.exports = db;
