var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var path = require("path");

////////////////////////////////////////////
// +++++++++++++++++++++++++++++++
//var fs = require('fs');
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
////////////////////////////////////////////////////////////////////////

// կանչում ա սրանց հենց այս կետից, բայց handler-ը չի կանչվում
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//Import routes for "catalog" area of site
var catalogRouter = require("./routes/catalog");
/////////////////////////////////

var app = express();
////////////////////////////////////////////////////
//Устанавливаем соединение с mongoose

var mongoose = require("mongoose");
var mongoDB =
	"mongodb+srv://heroku:TO79O0qWkOxrrSJi@cluster0.jmjzr.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/////////////////////////////////////////////////////
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
///////////////////////////////////
//app.use(logger('dev'));
//':method' -> get
// :referrer ->  http://localhost:3000/catalog/authors
// :remote-addr -> ::1
// :remote-user -> -
// :req[header] -> -
// :res[header] -> -
// :response-time[digits] -> The time between the request the response in milliseconds.
// :url -> /catalog/bookinstances
// :user-agent
// :date[web] -> Sat, 08 Feb 2020 19:14:34 GMT
// app.use(logger('combined', { stream: accessLogStream }));
//app.use(logger('tiny'));
// app.use(logger(':method :url :response-time[4] :status'));

app.use(
	logger("dev", {
		skip: (req, res) => {
			return res.statusCode < 400;
		},
	})
);

//////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/////////////////////////////////////////////////////////////
// init callbacks, then invokes Router երբ էջը բացում ենք
// Կարծես էստեղ ռոուտերները ինիցիլիզացվում են
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Add catalog routes to middleware chain.
app.use("/catalog", catalogRouter);

//////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

////////////////////////////////////////////////
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	//////////////////////////////////////////////////////
	// render the error page
	res.status(err.status || 500);

	res.render("error");
});

module.exports = app;
