/**
 * Created by zf on 2016/1/22.
 * 这里是后台的用户模型
 */
var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var auserSchema = new Schema({
    username:String,
    password:String,
    mail:String,
    //权限
    power:String,
    //登录ip
    ip:String,
    //real name
    name:String

});

//exports.User
exports.Auser = mongoose.model("Auser",auserSchema);