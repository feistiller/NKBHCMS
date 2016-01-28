/**
 * Created by zf on 2016/1/27.
 */
//文章数据库模型

var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    lableid:String,
    //用来记录文章标签
    articlename:String,
    articletext:String,
    articledata:String,
    articlewriter:String,
    articleview:String
    //观看次数


});

//exports.Article
exports.Article = mongoose.model("Article",articleSchema);
