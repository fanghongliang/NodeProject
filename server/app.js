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

app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials",true)
  // 第二个参数表示允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
      res.sendStatus(200)
  } else {
      next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('json spaces', 2)
app.use(logger('short'));
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

// 当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).json({"msg": 'token失效'});
	}
});

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
  res.json({msg: 500, msg: '服务器出错', err})
  res.render('error');
  next()
});

module.exports = app;