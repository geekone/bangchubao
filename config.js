/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */


var winston = require('winston');
exports.Logger = new(winston.Logger)({
    transports: [
        new (winston.transports.Console)()
        //new (winston.transports.File)({ filename: 'app.log',maxsize:500 ,maxFiles:3,timestamp:true})
//        new (winston.transports.File)({ filename: 'app.log', dirname: __dirname + '/logs', maxsize: 1000}),
//        new (winston.transports.Console)({level:'error'})		//只显示error部分
    ]
});