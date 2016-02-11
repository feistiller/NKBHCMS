/**
 * Created by zf on 2016/2/11.
 * 反馈信息模型
 */
var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var mailSchema = new Schema({
    contact:String,
    content:String
});

//exports.Mail
exports.Mail = mongoose.model("Mail",mailSchema);