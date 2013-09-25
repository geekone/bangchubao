var config = require('../config');
var mysql = require('mysql');



exports.index = function(req, res,next){
    checklogin(req,res,next);
    res.render('admin/index',{layout:'admin/layout'});
    //TODO 补500 404
//    next("this is admin error");
};


//跳转到用户登录或用户POST登录
exports.login = function(req,res,next){
    if(req.method == 'GET'){
        res.render("admin/login",{layout:false});
    }else if(req.method == 'POST'){
        _email = req.body.email;
        _passwd = req.body.passwd;
        if(_email == '1' && _passwd =='1'){
             req.session.logined = true;
            res.redirect("/admin/");
        }else{
            res.render("admin/login",{layout:false});
        }
    }
};

//登录退出
exports.loginout = function(req,res,next){
    req.session.logined = false;
    res.redirect('/admin/login');
}

//验证用户登录函数
var checklogin = function(req,res,next){
    if(!req.session.logined){
        res.redirect("/admin/login");
    }

};

//用户列表
exports.users = function(req,res,next){
         checklogin(req,res,next);
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query("SELECT * FROM users",function(err,results){
            if (err) {
                console.log(err);
                return;
            }
            client.end();
            //TODO 没做分页
            res.render("admin/users",{layout:'admin/layout',users:results});
        });
};

//添加用户
exports.adduser = function(req,res,next){
        checklogin(req,res,next);
        if(req.method == 'GET'){
            res.render('admin/adduser',{layout:'admin/layout'});
        }else if(req.method == 'POST'){
            _username = req.body.username;
            _nickname = req.body.nickname;
            _email = req.body.email;
            _password = req.body.password;
            client = mysql.createConnection(config.db_options);
            client.connect();
            client.query("INSERT INTO users SET username =?,nickname=?,email=?,passwd=? ",[_username,_nickname,_email,_password],function(err,results){
                if (err) {
                    console.log(err);
                    return;
                }
                client.end();
                res.redirect("/admin/users");
            });

        }
};



//所有分类
exports.categories = function(req,res,next){

    var page = req.query.p;
    if(!page){
        page = 1;
    }else{
        page = parseInt(page);
    }

    console.log(page);

    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query('SELECT * FROM zhms_category limit ?,10 ',[(page-1)*10],function selectCb(err, results, fields) {
       if (err) {
           console.log(err);
       }
        client.end();
       res.render('admin/categories',{layout:'admin/layout',page:page,categorylist:results,cateLen: results.length});
     });
};

//通过分类CAIXI查找下面的未发布
exports.caixi = function(req,res,next){

    var page = req.query.p;
    if(!page){
        page = 1;
    }else{
        page = parseInt(page);
    }


    var category = req.params.category;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where catestr=? and publish=0 limit ?,10",[category,(page-1)*10],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        client.end();
        res.render('admin/caixi',{layout:'admin/layout',cailist:results,page:page,caixiLen: results.length});
    });
};

//已发布的
exports.caixipublish = function(req,res,next){

    var page = req.query.p;
    if(!page){
        page = 1;
    }else{
        page = parseInt(page);
    }

   var category = req.params.category;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where catestr=? and publish = 1 limit ?,10",[category,(page-1)*10],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        client.end();
        res.render('admin/caixipublish',{layout:'admin/layout',cailist:results,page:page,caixiLen: results.length});
    });
};


//更新菜谱
exports.editcaipu = function(req,res,next){
    var id = req.params.id;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where id=?",[id],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        client.end();
        res.render('admin/editcaipu',{layout:'admin/layout',caipu:results[0]});
    });
};

exports.updatecaipu = function(req,res,next){
    _title = req.body.title;
    _content = req.body.content;
    _id = req.body.id;
    client = mysql.createConnection(config.db_options);
    client.connect();

    client.query('update zhms_caixi set content = ? , publish = ? where id=?',[_content,1,_id],function(err){
        if(err){
            console.log(err);
            return;
        }
        client.end();
    });
    res.send("ok")
};


/***************  测试 ******************/
//session test
exports.sessiontest = function(req,res,next){
         if(req.session.logined){
             res.send("session logined ok:" +req.session.logined );
         }else{
             req.session.logined = true;
             res.send("session logined no ok")
         }
};