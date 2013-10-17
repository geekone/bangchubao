
//用于需要的route.js文件
var home = require('../app/controllers/home');
//var articles = require('../app/controllers/articles');
var admin = require('../app/controllers/admin');


module.exports = function(app){

	app.get("/",home.index);


	/** admin **/
	app.get("/admin/?",admin.index);


    //资讯分类
        //
        app.get('/admin/newscategories/?',admin.newscategories);
        app.post('/admin/addnewscate/?',admin.addnewscate);
        app.get('/admin/editnewscate/?',admin.editnewscate);
        app.post('/admin/editnewscate/?',admin.editnewscate);
        app.get('/admin/delnewscate/?',admin.delnewscate);

        app.get('/admin/news/?',admin.news);
        app.post('/admin/addnews/?',admin.addnews);
        app.get('/admin/editnews/?',admin.editnews);
        app.post('/admin/editnews/?',admin.editnews);
        app.get('/admin/delnews/?',admin.delnews);


    //user
        app.get('/admin/users/?',admin.users);
        app.post('/admin/adduser/?',admin.adduser);
        app.get('/admin/edituser/?',admin.edituser);
        app.post('/admin/edituser/?',admin.edituser);
        app.get('/admin/deluser/?',admin.deluser);

    //cook
        app.get('/admin/cookcategories/?',admin.cookcategories);
        app.post('/admin/addcookcate/?',admin.addcookcate);
        app.get('/admin/editcookcate/?',admin.editcookcate);
        app.post('/admin/editcookcate/?',admin.editcookcate);
        app.get('/admin/delcookcate/?',admin.delcookcate);

        app.get('/admin/cooks/?',admin.cooks);
        app.post('/admin/addcook/?',admin.addcook);
        app.get('/admin/editcook/?',admin.editcook);
        app.post('/admin/editcook/?',admin.editcook);
        app.get('/admin/delcook/?',admin.delcook);


};
