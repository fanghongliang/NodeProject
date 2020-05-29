var verToken = require('./jwt.js')

//请求时间
// const requestTime = function(req, res, next) {
//     req.requestTime = Date.now()
//     next()
// }

//解析token
// const tokenVerify = function(req, res, next) {
// 	var token = req.headers['authorization'];
// 	if(!token){
// 		return next();
// 	} else {
// 		verToken.verToken(token).then((data)=> {
// 			req.data = data;
// 			return next();
// 		}).catch((error)=>{
// 			return next();
//     })
//     // var info = jwt.verify(token.split(' ')[1], 'secret123456');
//     // req.data = info;
//     // next()
// 	}
// };

const middArr = [
    requestTime = function(req, res, next) {
        req.requestTime = Date.now()
        next()
    },

    tokenVerify = function(req, res, next) {
        var token = req.headers['authorization'];
        if(!token){
            return next();
        } else {
            verToken.verToken(token).then((data)=> {
                req.data = data;
                return next();
            }).catch((error)=>{
                return next();
            })
        }
    }
]

module.exports = {
    requestTime,
    tokenVerify,
    middArr,
}