var config = require('../config');
var mysql = require('mysql');



exports.index = function(req, res,next){
    res.render('admin/index',{layout:'admin/layout'});
    //TODO 补500 404
//    next("this is admin error");
};


//所有分类
exports.categories = function(req,res,next){
    //需要在开启连接然后关闭
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query('SELECT * FROM zhms_category',function selectCb(err, results, fields) {
       if (err) {
           console.log(err);
       }
     client.end();
       res.render('admin/categories',{layout:'admin/layout',categorylist:results});
     });
};

//通过分类CAIXI查找下面的未发布
exports.caixi = function(req,res,next){
    var category = req.params.category;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where catestr=? and publish=0 limit 10",[category],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        client.end();
        res.render('admin/caixi',{layout:'admin/layout',cailist:results});
    });
};

//已发布的
exports.caixipublish = function(req,res,next){
   var category = req.param.category;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where catestr=? and publish = 1 limit 10",[category],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        client.end();
        res.render('admin/caixipublish',{layout:'admin/layout',cailist:results});
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
