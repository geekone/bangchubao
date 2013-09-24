
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,partials = require('express-partials')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: 'SEKRET!!!'}));
app.use(partials());
app.use(app.router);
app.use(errorHandler);           //如果使用自定义的ERROR,开启这行
app.use(express.static(path.join(__dirname, 'public')));

// 默认的错误处理
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//自定义的错误处理 this err for next(str)
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {layout:false,error: err });
}





// 路由
/**        home     **/
app.get('/', routes.index);

//菜系
app.get('/caixi/:category',routes.caixi);

/**        admin     **/
app.get('/admin',admin.index);
app.get('/admin/login/?',admin.login);          //跳转到登录
app.post('/admin/login/?',admin.login);         //POST登录
app.get('/admin/loginout/?',admin.loginout);    //退出登录

app.get('/admin/categories/?',admin.categories);

//通过分类查找
//未发布
app.get('/admin/caixi/:category',admin.caixi);
//已经发布
app.get('/admin/caixipublish/:category',admin.caixipublish);

//更新菜谱
app.get('/admin/editcaipu/:id',admin.editcaipu);
app.post('/admin/updatecaipu',admin.updatecaipu);


//测试部分
app.get('/admin/sessiontest/?',admin.sessiontest);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
