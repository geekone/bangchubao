/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */

var caixi_list = ["川菜","湘菜","粤菜","东北菜","鲁菜","浙菜","苏菜","清真菜","闽菜","沪菜","京菜","湖北菜","徽菜","豫菜","西北菜","云贵菜","江西菜","山西菜","港台菜","其它菜"];
var jiachang_list = ["家常菜","私家菜","凉菜","海鲜","热菜","汤粥","素食","酱料沾料","微波炉","火锅底料","甜品点心","糕点主食","干果制作","卤酱","时尚饮品"]






var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bangchubao'
};

var mysql      = require('mysql');
var client = mysql.createConnection(db_options);





client.connect(function(err,results){
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Connected to MySQL");
});

TEST_DATABASE = "bangchubao";
TEST_TABLE1 = "jiachang";
TEST_TABLE2 = "caixi";


client.query('USE ' + TEST_DATABASE  )

caixi_list.forEach(function(name){
    client.query('INSERT INTO ' + TEST_TABLE2 + ' SET name =?',name);
});

jiachang_list.forEach(function(name){
    client.query('INSERT INTO ' + TEST_TABLE1 + ' SET name =?',name);
});


//插入方法
//name = "test1";
//client.query('INSERT INTO ' + TEST_TABLE1 + ' SET name =?',name);

//更新方法
//name = "test11";
//client.query('UPDATE ' + TEST_TABLE1 + ' SET name = ? ',name);

//删除
//client.query('DELETE FROM ' +TEST_TABLE1 + " WHERE id = ?",1);

client.end();
