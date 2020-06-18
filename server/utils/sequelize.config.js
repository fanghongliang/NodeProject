const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'nodesql',
    'root',
    '123456',
    {
        'dialect': 'mysql',
        'host': '106.13.4.75',
        'port': 3306
    }
)

module.exports = {
    Sequelize, 
    sequelize
}