var config = require('../config');
var mysql = require('mysql');

exports.index = function(req, res,next){

    client = mysql.createConnection(config.db_options);
    client.connect();
//    client.query('SELECT * FROM zhms_category',function selectCb(err, results) {
//        if (err) {
//            console.log(err);
//        }
//        console.log(results);
//        client.end();
//        res.render('index',{categorylist:results});
//    });
        client.query("SELECT * FROM zhms_caixi where catestr='chuancai' and publish = 0 limit 10",function selectCb(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results.length);
        client.end();
        res.send("ok");
    });

};

