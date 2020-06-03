var path = require('path');
var fs = require('fs')
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator')

var logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

morgan.token('timeStamp', function(req, res){
    let date = new Date()
    let logHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours() 
    let logMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let logSecond = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    let logDate = `${logHour}:${logMinute}:${logSecond}`
    return logDate
  });
  
  // 自定义format，其中包含自定义的token
  morgan.format('joke', '[joke :timeStamp] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms');
  
  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })

  module.exports = {morgan, accessLogStream}