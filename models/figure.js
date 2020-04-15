var mongoose = require('mongoose');

const figureScheme = mongoose.Schema({
    issue: {type: String, required :  true},
    name: {type: String, required :  true},
    description: {type: String, required :  true},
    price: {type: String, required :  true},
    height: {type: String, required :  true},
    edition: {type: String, required :  true},
    collected: {type: Boolean, required :  true},
    imageUrl: {type: String},
});

var Figure = mongoose.model('alien',figureScheme);
module.exports = Figure;