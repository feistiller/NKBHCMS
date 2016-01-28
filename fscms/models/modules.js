/**
 * Created by zf on 2016/1/12.
 */
var mongoose = require( 'mongoose' );
var config = require('../db');
var Schema   = mongoose.Schema;

var article = new Schema({
    title:String,
    user_id    : String,
    type:String,
    content    : String,
    updated_at : Date
});
mongoose.model( 'article', article );
mongoose.connect(config.db.mongodb);