/**
 * Created by zf on 2016/1/22.
 * 主要是负责admin系列路由的设置
 */
var express = require('express');
var router = express.Router();
//后台User部分引入
var ausermodel = require('../models/adminusermodel');
var Auser = ausermodel.Auser;
//标签模型引入
var lablemodel = require('../models/lablemodel');
var Lable = lablemodel.Lable;
//文章模型引入
var articlemodel = require('../models/articlemodel');
var Article = articlemodel.Article;

//后台登录模块
router.get('/', function (req, res, next) {
    res.render('login')
});
router.post('/login', function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password

    }
    Auser.findOne({username: user.username}, function (err, usercherk) {
        if (err) {
            callback(err);
        }
        //res.send(usercherk)
        if (usercherk.password != user.password) {
            res.send("用户名或者密码输入错误")
        } else {
            res.send("登录成功")
        }
    });
});

//后台新增用户模块
router.get('/newuser', function (req, res) {
    res.render('admin/newuser')
})
router.post('/newuser', function (req, res) {
    var username = req.body.username
    var password = req.body.new_password
    var repassword = req.body.renew_password
    var mail = req.body.mail
    var power = req.body.power
    var name = req.body.name

    if (password != repassword) {
        res.send('密码重复错误');
        //console.log("密码错误")
    } else {
        var auser = new Auser({
            username: username,
            password: password,
            mail: mail,
            power: power,
            name: name
        });
        auser.save(function (err) {
            if (err) {
                callback(err);
            }
        });
        res.send('注册成功');
        //console.log("成功")
    }
})

//后台标签录入
router.get('/newlable', function (req, res) {

    Lable.find({}, function (err, lables) {
        if (err) {
            callback(err)
        } else {

            res.render('admin/newlable', {
                title: "标签录入",
                lables: lables

            })
        }
    })

})

router.post('/newlable', function (req, res) {
    var lable = new Lable({
        lableid:req.body.lableid,
        lablename:req.body.lablename,
        f_id:req.body.f_id
    })
    lable.save( function (err, lables) {
        if (err) {
            callback(err)
        } else {
           res.send("success")
        }
    })

})

//后台标签修改
router.get('/lable/change/:lable_id', function (req, res) {
    Lable.find({_id:req.params.lable_id}, function (err,clable) {
        if(err){
            callback(err)
        }else{
            res.render('admin/change',{
                title:"标签更改",
                clable:clable
            })
        }

    })
})
router.post('/lable/change/:lable_id', function (req, res) {
    var lable={
        lableid:req.body.lableid,
        lablename:req.body.lablename,
        f_id:req.body.f_id
    }
    Lable.update({_id:req.params.lable_id},{$set:lable},function (err) {
        if(err){
            callback(err)
        }else{
            res.redirect('/admin/newlable')
        }
    })
})

//后台标签删除
router.get('/lable/del/:lable_id', function (req, res) {
    Lable.remove({_id:req.params.lable_id}, function (err) {
        if(err){
            callback(err)
        }else{
            res.redirect('/admin/newlable')
        }
    })
})


//后台文章录入模块
router.get('/newarticle', function (req, res) {
    Lable.find({}, function (err, lables) {
        if (err) {
            callback(err)
        } else {

            res.render('admin/newarticle', {
                title: "文章录入",
                lables: lables

            })
        }
    })
})
router.post('/newarticle', function (req, res) {
    var article=new Article({
        articlename:req.body.articlename,
        articledate:req.body.articledate,
        articleview:req.body.articleview,
        lableid:req.body.lableid,
        articletext:req.body.articletext,
        articlewriter:"admin",
        //文章状态初始化为1，未审核阶段
        articlestate:1
    })
    article.save(function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/article')
        }
    })
})

//后台文章管理模块
router.get('/article', function (req, res) {
    Article.find({}, function (err, articles) {
        if (err) {
            callback(err)
        } else {

            res.render('admin/article', {
                title: "文章管理",
                articles: articles

            })
        }
    })

})

//后台文章修改
router.get('/article/change/:article_id', function (req,res) {
    Article.find({_id:req.params.article_id}, function (err, article) {
        if(err){
            callback(err)
        }else{
            Lable.find({lableid:article[0].lableid}, function (err, lables) {
                if(err){
                    callback(err)
                }else{
                    res.render('admin/articlechange',{
                        title:"文章修改",
                        article:article,
                        lables:lables
                    })
                }
            })

        }
    })

})
router.post('/article/change/:article_id', function (req, res) {
    var article={
        articlename:req.body.articlename,
        articledate:req.body.articledate,
        articleview:req.body.articleview,
        lableid:req.body.lableid,
        articletext:req.body.articletext,
        articlewriter:"admin",
        //文章状态重新初始化为1，未审核阶段
        articlestate:1
    }
    Article.update({_id:req.params.article_id},{$set:article}, function (err) {
        if(err){
            callback()
        }else{
            res.redirect('/admin/article')
        }
    })

})

//后台文章删除
router.get('/article/del/:article_id', function (req, res) {
    Article.remove({_id:req.params.article_id}, function (err) {
        if(err){
            callback(err)
        }else{
            res.redirect('/admin/article')
        }
    })

})

//后台审核通过
router.get('/article/agree/:article_id', function (req, res) {
    var updata={
        articlestate:2
    }
    Article.update({_id:req.params.article_id},{$set:updata}, function (err) {
        if(err){
            callback(err)
        }else{
            res.redirect('/admin/article')
        }
    })
})

//后台文章审核不通过
router.get('/article/disagree/:article_id', function (req, res) {
    var updata={
        articlestate:1
    }
    Article.update({_id:req.params.article_id},{$set:updata}, function (err) {
        if(err){
            callback(err)
        }else{
            res.redirect('/admin/article')
        }
    })
})

module.exports = router;