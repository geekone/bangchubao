//管理模块
var mongoose = require("mongoose");
var NewsCategory = mongoose.model("NewsCategory");


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
exports.users = function(req,res,next){

};

exports.adduser = function(req,res,next){

};

exports.deluser = function(req,res,next){

};

exports.edituser = function(req,res,next){

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

