const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'nodesql',
    'root',
    '123456',
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    }
)

module.exports = {
    Sequelize, 
    sequelize
}