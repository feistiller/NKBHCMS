/**
 * Created by zf on 2016/1/12.
 */
var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:String,
    password:String,
    mail:String,
    talk:String
});

//exports.User
exports.User = mongoose.model("User",userSchema);
//mongoose.connect(config.db.mongodb);
////引入mongoose,连接数据库
//var db = mongoose.connection;
////mongdb数据库连接错误的时候被调用
//db.on('error', console.error.bind(console, 'connection error:'));
////数据库成功打开的时候被调用
//db.once('open', function callback () {
//    console.log('数据库连接成功!');
//});