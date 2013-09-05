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

//通过分类CAIXI查找下面的
exports.caixi = function(req,res,next){
    var category = req.params.category;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where catestr=? limit 10",[category],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        console.log(results.length);
        client.end();
        res.render('admin/caixi',{layout:'admin/layout',cailist:results});
    });

};

exports.caipu = function(req,res,next){
    var id = req.params.id;
    client = mysql.createConnection(config.db_options);
    client.connect();
    client.query("SELECT * FROM zhms_caixi where id=?",[id],function(err,results){
        if (err) {
            console.log(err);
            return;
        }
        console.log(results);
        client.end();
        res.render('admin/caipu',{layout:'admin/layout',caipu:results[0]});
    });
};
