const {Sequelize, sequelize} = require('../utils/sequelize.config.js')

//表模型
let modleArr = [
    /**
     * user表，记录用户基本信息
     */
    User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.STRING(32),
        },
        age: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING(32)
        }
    }),

    /**
     * message表，记录消息类
     */
    Message = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.STRING(32),
        },
        content: {
            type: Sequelize.TEXT
        },
    }),

    /***
     * home_config表，首页配置
     */
    Home_config = sequelize.define('home_config', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        swiperList: {
            type: Sequelize.STRING()
        },
        iconList: {
            type: Sequelize.STRING()
        },
        recommendList: {
            type: Sequelize.STRING()
        },
        weekendList: {
            type: Sequelize.STRING()
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
]

//简历模型对应表
modleArr.map(item => {
    item.sync()
})

module.exports = {
    Message, 
    User,
    Home_config,
};