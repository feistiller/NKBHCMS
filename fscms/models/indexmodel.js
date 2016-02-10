/**
 * Created by zf on 2016/2/10.
 */
    //这是前台页面的各种标签
var mongoose = require('mongoose');
var config = require('../db');

var Schema = mongoose.Schema;

var mindexSchema = new Schema({
    title1:String,
    title2:String,
    content1:String,
    title3:String,
    content2:String,
    stitle1:String,
    stitle2:String,
    stitle3:String,
    scontent1:String,
    scontent2:String,
    scontent3:String,
    email:String,
    phone:String,
    qq:String

    //用来记录主页


});

//exports.Index
exports.Mindex = mongoose.model("Mindex",mindexSchema);