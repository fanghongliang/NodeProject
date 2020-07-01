/**
 * desc: 集中管理路由，并对外暴露
 * method： 在app.js内，只需调用 core.js 即可应用全部路由
 */

let router = require('express').Router()

router.use('/v2', require('./users.js'))
router.use('/api', require('./index.js'))

module.exports = router