var Sequelize = require('sequelize')
var sequelize = new Sequelize(
    'nodesql',
    'root',
    '123456',
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    }
)

//表模型
const User = sequelize.define('user', {
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
        type: Sequelize.INTEGER
    }
})

var Message = sequelize.define('message', {
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
})

User.sync();
Message.sync();     //创建表

module.exports = {
    Message, 
    User,
};