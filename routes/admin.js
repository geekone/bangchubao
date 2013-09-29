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

//******************  用户 ************************/
//用户列表
exports.users = function(req,res,next){
         checklogin(req,res,next);
        var pagesize = 2            //每页数量
        var page = req.query.p;     //当前页号
        if(!page){
            page = 1;
        }else{
            page = parseInt(page);
        }

        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query("SELECT * FROM users limit ?,?",[(page-1)*pagesize,pagesize],function(err,results){
            if (err) {
                console.log(err);
                return;
            }
            client.end();
            //TODO 没做分页
            res.render("admin/users",{layout:'admin/layout',users:results,page:page,usersLen: results.length,pagesize:pagesize});
        });
};

//删除用户
exports.deluser = function(req,res,next){
    checklogin(req,res,next);
    var uid = req.query.uid;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("DELETE FROM users where id=?",[uid],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        console.log(results);
        client.end();
        res.redirect("/admin/users");
    });
}

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

//修改用户
exports.edituser = function(req,res,next){
    checklogin(req,res,next);
    if(req.method == 'GET'){
        var uid = req.query.uid;

        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query("SELECT * FROM users where id=?",[uid],function(err,results){
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
            client.end();
            res.render('admin/edituser',{layout:'admin/layout',user:results[0]});
        });

    }else if(req.method == 'POST'){
        var _uid = req.body.uid;
        var _username = req.body.username;
        var _nickname = req.body.nickname;
        var _email = req.body.email;
        var _passwd = req.body.passwd;

        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query('update users set username = ?,nickname=?,email=?,passwd=? where id=?',[_username,_nickname,_email,_passwd,_uid],function(err){
            if(err){
                console.log(err);
                return;
            }
            client.end();
            res.redirect("/admin/users");
        });
    }

};

//查找
exports.searchuser = function(req,res,next){
    checklogin(req,res,next);
    if(req.method == 'GET'){
        res.redirect('/admin/users')
    }else{
        //TODO 只作了用户注册名的查找
        _username = req.body.username;
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query('SELECT * FROM users WHERE username LIKE \'%' + _username +'%\'' , function(err,results){
            if(err){
                console.log(err);
                return;
            }
            console.log(results)
            client.end();
            res.render('admin/searchuser',{layout:'admin/layout',users:results});
        });
    }
}


/**************　分类　*******************/

//所有分类
exports.categories = function(req,res,next){
    checklogin(req,res,next);
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

//删除分类
exports.delcategory = function(req,res,next){
    // TODO 可能会级联删除,先放一下
};
//添加
exports.addcategory = function(req,res,next){
    checklogin(req,res,next);
    if(req.method == 'GET'){
        res.render('admin/addcategory',{layout:'admin/layout'});
    }else if(req.method == 'POST'){
        _name = req.body.name;
        _ename = req.body.ename;
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query("INSERT INTO zhms_category SET name=?,ename=?",[_name,_ename],function(err,result){
            if(err){
                console.log(err);
                return;
            }
            client.end()
            res.redirect('/admin/categories');
        });
    }
}

//修改
exports.editcategory = function(req,res,next){
    checklogin(req,res,next);
    if(req.method == 'GET'){
        var cid = req.query.cid;
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query("SELECT * FROM zhms_category WHERE id =?",[cid],function(err,result){
            if(err){
                console.log(err);
                return;
            }
            client.end();
            res.render('admin/editcategory',{layout:'admin/layout',category:result[0]});
        });
    }else if(req.method == 'POST'){
       var _cid = req.query.cid;
       var _name = req.body.name;
       var _ename = req.body.ename;
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query('UPDATE zhms_category SET name = ?,ename=? WHERE id=?',[_name,_ename,_cid],function(err){
            if(err){
                console.log(err);
                return;
            }
            client.end();
            res.redirect("/admin/categories");
        });
    }
};



//**********************  菜谱　*********************************


//通过分类CAIXI查找下面的未发布
exports.caixi = function(req,res,next){
    checklogin(req,res,next);
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


//通过分类CAIXI查找下面的发布的
exports.caixipublish = function(req,res,next){
    checklogin(req,res,next);
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


//通过查找菜名，
exports.searchcai = function(req,res,next){
    checklogin(req,res,next);
    if(req.mothod == 'GET'){
        res.render('admin/searchcai');
    }else{
        _title = req.body.title;
        client = mysql.createConnection(config.db_options);
        client.connect();
        client.query('SELECT * FROM zhms_caixi WHERE title LIKE \'%' + _title + '%\'',function(err,results){
            if(err){
                console.log(err);
                return;
            }
            console.log(results);
            client.end();
            res.render('admin/searchcai',{layout:'admin/layout',cailist:results});
        });
    }
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