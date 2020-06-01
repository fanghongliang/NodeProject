var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParse = require('body-parser');
var logger = require('morgan');
const expressJwt = require('express-jwt')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var verToken = require('./utils/middwares/jwt.js')
let paramsVerify = require('./utils/middwares/paramsVerify.js')
var app = express();

// 托管静态文件
// app.use('/static', express.static('public'))                          //相对路径
app.use('/static', express.static(path.join(__dirname, 'public')))       //绝对路径
// http://localhost:3000/static/images/index/person.png || http://localhost:3000/images/index/person.png

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('json spaces', 2)
app.use(logger('dev'));
app.use(bodyParse.json()) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(paramsVerify.middArr)
app.use(expressJwt({
  secret: 'secret123456'  // 签名的密钥 或 PublicKey
}).unless({
  path: ['/login',]  // 指定路径不经过 Token 解析
}))

app.use('/', indexRouter);
app.use('/v2', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send('token失效');
	}
});

module.exports = app;