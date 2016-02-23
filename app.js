var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const warroom = require("./warroom-client");

require('dotenv').load();

var db = require('monk')(process.env.MONGOLAB_URI);
var times = db.get('times');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.io = require('socket.io')();

function updateDB(data) {
	return db.get('times').insert({ id: data.id, responseTime: data.responseTime });
}

function getAverage(data) {
	return new Promise(function(resolve, reject){
		db.get('times').find({ id: data.id }, { limit: 100, sort: {_id: -1} })
		.success(function(results) {
			var average = 0;
			for (var i in results) {
				average += results[i].responseTime;
			}
			data.average = average / 100;
			resolve(data);
		});
	});
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./client"));

app.use('/', routes);
app.use('/users', users);

app.io.on('connection', function (socket) {
	warroom(function(error, data) {
		dataToSend = data.data.map(function(server){
			return new Promise (function(resolve, reject) {
				updateDB(server)
				.success(function() {
					resolve(getAverage(server));
				});
			});
		});
		Promise.all(dataToSend).then(function(servers) {
			socket.emit("status", {
				body: {data: servers},
			});
		}).catch(function(err) {
			console.log(err);
		});
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
