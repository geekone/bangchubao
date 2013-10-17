//管理模块
var mongoose = require("mongoose");
var NewsCategory = mongoose.model("NewsCategory");
var User = mongoose.model("User");
var CookCategory = mongoose.model("CookCategory");
var Cook = mongoose.model('Cook');


exports.index = function(req,res,next){
	res.render('admin/index',{layout:'admin/layout'});
};

/**********  资读 **********/
exports.newscategorys = function(req,res,next){
    NewsCategory.find({},function(err,result){
        if(err){
            next(err)
        }else{
            res.render('admin/newscategory',{layout:'admin/layout',categorylist:result});
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
            res.redirect('/admin/newscategorys');
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
                res.redirect('/admin/newscategorys');
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
                res.redirect('/admin/newscategorys')
            }
        });
    }
}

//news list
exports.newsitem = function(req,res,next){
  res.render('admin/newsitem',{layout:'admin/layout'});
};

//add news
exports.addnews = function(req,res,next){
  res.render('admin/addnews',{layout:'admin/addnews'});
};


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
exports.cookcategorys = function(req,res,next){

};
//删除
exports.delcookcate = function(req,res,next){

}
exports.addcookcate = function(req,res,next){

}

exports.editcookcate = function(req,res,next){

}

exports.cooks = function(req,res,next){

};

exports.delcook = function(req,res,next){

};

exports.addcook = function(req,res,next){

};
exports.editcook = function(req,res,next){

}

