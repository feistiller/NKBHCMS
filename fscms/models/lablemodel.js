/**
 * Created by zf on 2016/1/22.
 */
//文章标签页数据库模型

var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var lableSchema = new Schema({
    lableid:String,
    lablename:String,
    //用来记录父级标签
    f_id:String


});

//exports.Lable
exports.Lable = mongoose.model("Lable",lableSchema);

