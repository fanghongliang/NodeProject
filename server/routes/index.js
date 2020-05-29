var express = require('express');
var router = express.Router();
let db = require('../db')
var {Message, User} = require('../models/test.js')
const jwt = require('jsonwebtoken')
const setToken = require('../utils/middwares/jwt.js')
const log = require('../utils/log.js')

//登录
router.post('/login', async (req, res, next) => {
  const user = {}
  let {userName} = req.body
  let data = await User.findOne({
    where: {
      userName: userName
    }
  })
  // log('查询结果返回：', JSON.stringify(data, null, 2))
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
    log('插入数据res', data)
    res.json({data})
  }).catch(err => {
    log('报错err', err)
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
    log('查找数据res', JSON.stringify(data, null, 2))
    res.json({
      errcode: 400,
      data
    })
  })
})

//删除一个用户
router.get('/del_user', async (req, res, next) => {
  let {userName} = req.query
  log('删除用户userID, ',userName)
  let result = await User.findOne({
    where: {userName,}
  })
  if(!result) {
    return res.json({msg: '不存在该用户'})
  }
  let data = await result.destroy()
  log('删除用户返回', data.toJSON())
  return res.json({msg: '删除成功', errcode: 0})
})

//更新用户信息
router.post('/rich_user_info', async (req, res, next) => {
  let data = req.body
  log('接受参数data', data, typeof(data))
  let result = await User.findOne({
    where: {userName: data.userName}
  })
  Object.keys(result.toJSON()).map(item => {
    data[item] ? result[item] = data[item] : ''
  })
  await result.save()
  res.json({msg: 'succ', data: result})
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//不使用sequelize，直接sql 
router.get('/user', (req, res, next) => {
  let {id} = req.query
  const sql = `select * from user where id = ${id}`
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
  log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  log('Request Type:', req.method)
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
  log('post 参数', params)
  res.json({
    errcode: 0,
    data: {'user': '0'}
  })
})

router.get('/register', (req, res, next) => {
  let params = req.query
  log('post 参数2', params)
  res.json({
    errcode: 0,
    data: {'user': '1'}
  })
})

module.exports = router;
