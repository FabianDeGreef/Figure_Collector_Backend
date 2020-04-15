var express = require('express');
var bodyParser  = require('body-parser');
var routes = require('./routes');

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});

app.use('/api',routes)

app.use('/static', express.static('Z:/Fabian/Project/Images'))

const port = 3000 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))