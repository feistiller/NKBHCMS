/**
 * Created by zf on 2016/2/2.
 */
//文章评论的模型
var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var talkSchema = new Schema({
    //评论文章id
    articleid:String,
    //评论用户id
    userid:String,
    //评论内容
    talktext:String,
    talkdate:String,
    //评论点赞
    talkup:String,
    talkdown:String,


});

//exports.Article
exports.Talk = mongoose.model("Talk",talkSchema);