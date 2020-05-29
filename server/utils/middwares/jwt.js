var jwt = require('jsonwebtoken');
var signkey = 'secret123456';

const setToken = function(userid){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			_id:userid
		},signkey,{ expiresIn:'36h' });
		resolve(token);
	})
}

const verToken = function(token){
	return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        if(info) {
            resolve(info);
        } else {
            reject(info)
        }
	})
}

module.exports = {
    verToken,
    setToken,
}