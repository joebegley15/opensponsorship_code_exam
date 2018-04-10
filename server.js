var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/athletes');

var port = 3000;

var app = express();

//View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Statis Folder
app.use(express.static(path.join(__dirname, 'client')));


// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
	console.log('Up and running on port#' + port);
})