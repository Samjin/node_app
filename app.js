var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


/*
 * buffer doesn't need require since it's foundation of node, like regular data type in js. 
 */
const buf = new Buffer('hello', 'utf8') //'utf8 is default event it's not specified. 'hello' is maximum letters allowed in this buffer when set. 

console.log(buf) //68 65 6c 6c 6f -> this is one type of binary data in hexadecimal notation format. 
console.log(buf.toString()) //hello
console.log(buf.toJSON()); // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }   -> character set.
console.log(buf[0]); // 104
// write letter to buffer, but since buf only allow 5 letters, it will replace 'hel'
// buf.write('sam'); // samlo
// console.log(buf.toString());

const fs = require('fs')
const zlib = require('zlib') //part of Node core, allow us to gzip files
const gzip = zlib.createGzip(); //this create a "readable stream"

/*Core of readable and writeable, Stream is event emiter */
// when reading the file, it'll fill the buffer with file content. 
// However, if it's bigger than buffer, it'll read the sequence chunk by chunk. 
const readable = fs.createReadStream(__dirname + '/lorem')
const writable = fs.createWriteStream(__dirname + '/lorem1')
const compressed = fs.createWriteStream(__dirname + '/lorem.sh.gz')

// Read readable-stream and transform to WRITABLE-stream, then the writable stream is 
// convert to "WRITABLE"" and READABLE" gzip stream through zlib.createGzip()
// then transform to another WRITABLE stream and saved as lorem.gz
readable.pipe(gzip).pipe(compressed)