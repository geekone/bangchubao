var express =  require("express");
var http = require("http");
var fs = require('fs');
var env = 'develop';			//当前是开发模式
var config = require('./config/config')[env];	//指定当前模式下的配置

var mongoose = require('mongoose');			//建立数据库连接
mongoose.connect(config.db);


//一次性引用所有的MODEL
var models_path =  config.root + "/app/models";
fs.readdirSync(models_path).forEach(function(file){
	if(~file.indexOf('.js'))
		require(models_path + "/" + file);
});



var app = express();
require('./config/express')(app,config);
require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
