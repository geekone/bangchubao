//建立成一个module

var express = require("express");
var partials = require('express-partials');
module.exports = function(app,config){
	app.set('port',config.port);
	app.engine('html', require('ejs').renderFile);
	  app.set('views', config.root + '/app/views');			//通过cofing.js 定义到app里面
	  app.set('view engine', 'html');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser('your secret here'));
	  app.use(express.session());
      app.use(partials());
	  app.use(express.static(config.root + '/public'));			//配置在config.js
	  app.use(app.router);
	  app.use(errorHandler);

};

//自定义一个error页,显示出错的信息
function errorHandler(err,req,res,next){
	res.render('error',{error:err});
}