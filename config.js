/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */

//var mysql = require('mysql'),client = null;

var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bangchubao'
};

exports.db_options = db_options;

//exports.client =   mysql.createConnection(db_options);

//client.query('USE bangchubao');

//exports.client = client;


var winston = require('winston');
exports.Logger = new(winston.Logger)({
    transports: [
        new (winston.transports.Console)()
        //new (winston.transports.File)({ filename: 'app.log',maxsize:500 ,maxFiles:3,timestamp:true})
//        new (winston.transports.File)({ filename: 'app.log', dirname: __dirname + '/logs', maxsize: 1000}),
//        new (winston.transports.Console)({level:'error'})		//只显示error部分
    ]
});