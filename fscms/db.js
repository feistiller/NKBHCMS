/**
 * Created by zf on 2016/1/12.
 * 2016.1.22修改数据库链接，将所有创建链接移动到DB上，modules文件仅建立模型
 */
//数据库链接串
var mongoose = require('mongoose');
//module.exports = {
//    "db": {
//        "mongodb": "mongodb://localhost/fscms",
//        "database": "fscms",
//        "server": "localhost"
//    }
//};
var db = {
    "mongodb": "mongodb://localhost/fscms",
    "database": "fscms",
    "server": "localhost"
}
mongoose.connect(db.mongodb);
//引入mongoose,连接数据库
var db = mongoose.connection;
//mongdb数据库连接错误的时候被调用
db.on('error', console.error.bind(console, 'connection error:'));
//数据库成功打开的时候被调用
db.once('open', function callback() {
    console.log('数据库连接成功!');
});
exports.db =db;