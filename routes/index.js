var config = require('../config');
var mysql = require('mysql');

exports.index = function(req, res,next){

    client = mysql.createConnection(config.db_options);
    client.connect();

        client.query("SELECT * FROM zhms_caixi where catestr='chuancai' and publish = 0 limit 10",function selectCb(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results.length);
        client.end();
        res.render("index.html");
    });
};

//caixi 跳转根据菜系
exports.caixi = function(req,res,next){
    _category = req.params.category
    console.log(_category);

    client = mysql.createConnection(config.db_options);
    client.connect();


    client.query("SELECT * FROM zhms_caixi WHERE catestr=? and publish = 0 limit 12",[_category],function selectCb(err,results){
        if(err){
            console.log(err);
            return;
        }
        client.end();
        res.render('caixi.html',{caixilist:results});
    });


};

