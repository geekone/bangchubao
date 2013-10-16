var path = require('path');		//需要使用path包设定路径
var rootPath = path.normalize(__dirname + "/..");		//得到项目跟目录路径
module.exports  = {

	'develop':{
		db: 'mongodb://localhost/test',
		root : rootPath,
		port: 3000
	}

};