var express = require('express');
var router = express.Router();
let db = require('../db')
var {Message, User} = require('../models/test.js')
const jwt = require('jsonwebtoken')
const setToken = require('../utils/middwares/jwt.js')
const {log} = console

//登录
router.post('/login', async (req, res, next) => {
  const user = {}
  let {userName} = req.body
  let data = await User.findOne({
    where: {
      userName: userName
    }
  })
  // console.log('查询结果返回：', JSON.stringify(data, null, 2))
  if(!data) { 
    user.userName = userName
    data = await User.create(user)
  }
  setToken.setToken(data.id).then(token => {
    return res.json({data: {data, token}})
  })
})

//添加一条留言
router.post('/add_msg', (req, res, next) => {
  var {userName, content} = req.body
  if(!userName || !content) {
    res.json({
      errcode: 600,
      desc: '参数无效'
    })
    return
  }
  var message = {
    userName: req.body.userName,
    content: req.body.content,
  }
  Message.create(message).then(data => {
    console.log('插入数据res', data)
    res.json({data})
  }).catch(err => {
    console.log('报错err', err)
  }) 
})

//查找某内容
router.get('/getOne', (req, res, next) => {
  if(!req.data) {
    return res.json({
			msg:'token invalid'
		})
  }
  Message.findAll().then(data => {
    console.log('查找数据res', JSON.stringify(data, null, 2))
    res.json({
      errcode: 400,
      data
    })
  })
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res, next) => {
  const sql = 'select * from user'
  db.query(sql, [], function(result, fields) {
    log('查询数据', result)
    let data = JSON.parse(JSON.stringify(result))
    if(data[0].address = '北京') {
      data[0].address = '上海'

    }
    data1 = req.requestTime
    res.json({
      status: 0,
      data,
      data1
    })
  })
})

function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

router.get('/email', (req, res, next) => {
  res.json({
    status: 601,
    mag: {name: 'fhl', email: '127277'}
  })
})

var logStuff = [logOriginalUrl, logMethod]
router.get('/register', logStuff, (req, res, next) => {
  let params = req.query
  console.log('post 参数', params)
  res.json({
    errcode: 0,
    data: {'user': '0'}
  })
})

router.get('/register', (req, res, next) => {
  let params = req.query
  console.log('post 参数2', params)
  res.json({
    errcode: 0,
    data: {'user': '1'}
  })
})

module.exports = router;
