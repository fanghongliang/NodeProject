var express = require('express');
var router = express.Router();
let db = require('../db')
const {log} = console
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
    res.json({
      status: 0,
      data,
    })
  })
})

router.get('/email', (req, res, next) => {
  res.json({
    status: 601,
    mag: {name: 'fhl', email: '127277'}
  })
})

module.exports = router;
