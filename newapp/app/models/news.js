var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsCategorySchema = new Schema({
    name:{type:String,default:'',trim:true}
});

var NewsSchema = new Schema({
   title:{type:String},
   content:{type:String},
   createAt:{type:Date,default:Date.now}
});

mongoose.model('NewsCategory',NewsCategorySchema);
mongoose.model('News',NewsSchema);
