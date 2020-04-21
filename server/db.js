let mysql = require('mysql')
let dbConfig = require('./utils/dbConfig')
const {log} = console

module.exports = {
    query: function(sql, params, callback) {
        let conn = mysql.createConnection(dbConfig)
        conn.connect(function(err) {
            if(err) {
                log('数据库连接失败')
                throw err
            }
            conn.query(sql, params, function(err, res, fields) {
                if(err) {
                    log('数据库操作失败')
                    throw err
                }
                callback && callback(res);
                conn.end(err => {
                    if(err) {
                        log('数据库关闭失败')
                        throw err
                    } 
                })
            })
        })
    }
}