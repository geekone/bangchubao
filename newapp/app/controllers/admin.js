//管理模块
var mongoose = require("mongoose");
var NewsCategory = mongoose.model("NewsCategory");
var News = mongoose.model("News");
var User = mongoose.model("User");
var CookCategory = mongoose.model("CookCategory");
var Cook = mongoose.model('Cook');


exports.index = function(req,res,next){
	res.render('admin/index',{layout:'admin/layout'});
};

/**********  资读 **********/
exports.newscategories = function(req,res,next){
    NewsCategory.find({},function(err,result){
        if(err){
            next(err)
        }else{
            res.render('admin/newscategories',{layout:'admin/layout',categorylist:result});
        }
    });
};

//添加资讯分类
exports.addnewscate = function(req,res,next){
   _name = req.body.name;
   var newscate  = new NewsCategory({name:_name});
    newscate.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect('/admin/newscategories');
        }
    });
};

//删除资讯分类
exports.delnewscate = function(req,res,next){
        var _cid = req.query.cid;
        NewsCategory.remove({_id:_cid},function(err){
            if(err){
                next(err);
            }else{
                res.redirect('/admin/newscategories');
            }
        });
};

//更新资讯分类
exports.editnewscate = function(req,res,next){
    if(req.method == "GET"){
        var _cid = req.query.cid;
        NewsCategory.findOne({_id:_cid},function(err,result){
            if(err){
                next(err);
            }else{
                res.render('admin/editnewscate',{layout:'admin/layout',category:result});
            }
        });

    }else if(req.method == 'POST'){
        var _cid = req.body.cid;
        var _name = req.body.name;
        var query = { _id: _cid };
        NewsCategory.update(query, { name: _name }, false, function(err){
            if(err){
                next(err);
            }else{
                res.redirect('/admin/newscategories')
            }
        });
    }
}

//news list
exports.news = function(req,res,next){
    News.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render('admin/news',{layout:'admin/layout',newslist:result});
        }
    });
};

//删除 news
exports.delnews = function(req,res,next){
    var id = req.query.id;
    News.remove({_id:id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/news");
        }
    });
};


//add news
exports.addnews = function(req,res,next){
  var _title = req.body.title;
  var _content = req.body.content;
  var data = {
    title:_title,
    content:_content
  };
  var news = new News(data);
   news.save(function(err){
       if(err){
           next(err);
       }else{
           res.redirect("/admin/news");
       }
   });

};

//编辑 news
exports.editnews = function(req,res,next){
    if( req.method == "GET"){
        var id = req.query.id;
        News.findOne({_id:id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editnews",{layout:"admin/layout",news:result});
            }
        });
    }else if(req.method == "POST"){
        var id = req.body.id;
        var query = {_id:id};
        var _title = req.body.title;
        var _content = req.body.content;
        var data = {
            title:_title,
            content:_content
        };
        News.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/news");
            }
        });
    }
}

/**********  用户 **********/
//所有用户
exports.users = function(req,res,next){
    User.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render('admin/users',{layout:'admin/layout',userlist:result});
        }
    });
};

//添加用户
exports.adduser = function(req,res,next){
    var _username = req.body.username;
    var _nickname = req.body.nickname;
    var _password = req.body.password;
    var _email = req.body.email;
    var _phone = req.body.phone;
    var _qq = req.body.qq;
    var data = {
        username:_username,
        nickname:_nickname,
        password:_password,
        email:_email,
        phone:_phone,
        qq:_qq
    };
    var newUser = new User(data);
    newUser.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/users");
        }
    });

};

//删除用户
exports.deluser = function(req,res,next){
    var _uid = req.query.uid;
    User.remove({_id:_uid},function(err){
        if(err){
            next(err);
        }else{
           res.redirect("/admin/users");
        }
    });
};

//更新用户
exports.edituser = function(req,res,next){
    if(req.method == "GET"){
        var _uid = req.query.uid;
        User.findOne({_id:_uid},function(err,result){
            if(err){
                next(err);
            }else{
               res.render("admin/edituser",{layout:"admin/layout",user:result});
            }
        });
    }else if(req.method == "POST"){
        var _uid = req.body.uid;
        var query = {_id:_uid};
        var _username = req.body.username;
        var _nickname = req.body.nickname;
        var _password = req.body.password;
        var _email = req.body.email;
        var _phone = req.body.phone;
        var _qq = req.body.qq;
        var data = {
            username:_username,
            nickname:_nickname,
            password:_password,
            email:_email,
            phone:_phone,
            qq:_qq
        };
        User.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
               res.redirect("/admin/users");
            }
        });
    }
};


/***********  Cook ******************/
//列表
exports.cookcategories = function(req,res,next){
    CookCategory.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/cookcategories",{layout:"admin/layout",categorylist:result});
        }
    });
};
//删除
exports.delcookcate = function(req,res,next){
    var _cid = req.query.cid;
    CookCategory.remove({_id:_cid},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/cookcategories");
        }
    });
}

//添加分类
exports.addcookcate = function(req,res,next){
    var _name = req.body.name;
    var _ename = req.body.ename;
    var data = {
        name:_name,
        ename:_ename
    };
    var cookCate = new CookCategory(data);
    cookCate.save(function(err){
        if(err){
            next(err);
        }else{
            res.redirect('/admin/cookcategories');
        }
    });
}

//编辑修改分类
exports.editcookcate = function(req,res,next){
    if (req.method == "GET"){
        var _cid = req.query.cid;
        CookCategory.findOne({_id:_cid},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editcookcategory",{layout:"admin/layout",category:result});
            }
        });
    }else if(req.method == "POST"){
        var _cid = req.body.cid;
        var query = {_id:_cid};
        var data = {
            name:req.body.name,
            ename:req.body.ename
        };
        CookCategory.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/cookcategories");
            }
        });

    }
}


//列表
exports.cooks = function(req,res,next){
    Cook.find({},function(err,result){
        if(err){
            next(err);
        }else{
            res.render("admin/cooks",{layout:"admin/layout",cooklist:result});
        }
    });
};

//删除
exports.delcook = function(req,res,next){
    var id = req.query.id;
    Cook.remove({_id:id},function(err){
        if(err){
            next(err);
        }else{
            res.redirect("/admin/cooks");
        }
    });
};

//添加
exports.addcook = function(req,res,next){
    var _title = req.body.title;
    var _img = req.body.img;
    var data = {
        title:_title,
        img:_img
    }
    var cook = new Cook(data);
    cook.save(function(err){
       if(err){
           next(err);
       } else{
           res.redirect("/admin/cooks");
       }
    });
};

//编辑
exports.editcook = function(req,res,next){
    if(req.method == "GET"){
        var id = req.query.id;
        Cook.findOne({_id:id},function(err,result){
            if(err){
                next(err);
            }else{
                res.render("admin/editcook",{layout:"admin/layout",cook:result});
            }
        });
    }else if(req.method == "POST"){
        var id = req.body.id;
        var query = {_id:id};
        var data = {
            title:req.body.title,
            img:req.body.img
        }
        Cook.update(query,data,false,function(err){
            if(err){
                next(err);
            }else{
                res.redirect("/admin/cooks");
            }
        });
    }
}

