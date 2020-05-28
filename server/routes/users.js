var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/user', (req, res, next) => {
  res.json({
    "name": 'ffff'
  })
})

const wxConfig = {
  'AppID': 'wxc5cfc90347a82cfb',
  'AppSecret': '9bcb7f26a0c8104869d55dc9537063b2'
}

//生成token
function createToken() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = chars.length;
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.substr(Math.round(Math.random() * length), 1);
  }
  return str;
};
/* GET users listing. */
router.post('/login', function(req, res, next) {
  var code = req.query.code;
  console.log('接收到code:12',)
  res.json({
    "name": 'token'
  })
  // request.get({
  //   url: 'https://api.weixin.qq.com/sns/jscode2session',
  //   json: true,
  //   qs: {
  //     grant_type: 'authorization_code',
  //     appid: wxConfig.AppID,
  //     secret: wxConfig.AppSecret,
  //     js_code: code
  //   }
  // }, function (err, res, data) {
  //   if (res.statusCode === 200) {
  //     console.log('登录成功返回数据： ', data)
  //     // User.findOne({
  //     //   openid: data.openid
  //     // }).then(function (info) {
  //     //   if (info) {
  //     //     console.info('用户已经存在');
  //     //     console.info(info.token)
  //     //     return res.send(token);
  //     //   } else {
  //     //     var user = new User({
  //     //       openid: data.openid,
  //     //       nickName: param.nickname,
  //     //       avatarUrl: param.head_img,
  //     //       creatAt: param.creatAt,
  //     //       token: createToken()
  //     //     })
  //     //     return user.save();
  //     //   }
  //     // })
  //   } else {
  //     console.info('[error]', err)
  //     res.json(err);
  //   }
  // })
});

module.exports = router;
