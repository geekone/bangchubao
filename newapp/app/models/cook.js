var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CookCategorySchema = new Schema({
    name:{type:String},
    ename:{type:String}
});


var CookSchema = new Schema({
    title:{type:String},
    img:{type:String},
    createAt:{type:Date,default:Date.now}
});

mongoose.model('CookCategory',CookCategorySchema);
mongoose.model('Cook',CookSchema);

