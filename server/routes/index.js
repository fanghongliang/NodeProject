var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res, next) => {
  res.json({
    status: 600,
    mag: {name: 'fhl', age: '18'}
  })
})

router.get('/email', (req, res, next) => {
  res.json({
    status: 601,
    mag: {name: 'fhl', email: '127277'}
  })
})

module.exports = router;
