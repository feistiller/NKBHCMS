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
//前台页面内容引入
var mindexmodel = require('../models/indexmodel');
var Mindex = mindexmodel.Mindex;
//反馈引入
var mailmodel = require('../models/mailmodel');
var Mail = mailmodel.Mail;


//后台登录模块
router.get('/', function (req, res, next) {
    res.render('login')
});
router.post('/', function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password

    }
    Auser.findOne({username: user.username}, function (err, usercherk) {
        if (err) {
            callback(err);
        } else {
            //res.send(usercherk)
            if (usercherk.password != user.password) {
                res.send("用户名或者密码输入错误")
            } else {
                //res.send("登录成功")
                //写入session
                req.session.username = user.username
                req.session.power = user.power

                res.redirect('/admin/index')
            }
        }
    });
});
//后台主页路由
//router.get('/index',checkNotLogin(req,res,next))
router.get('/index', function (req, res) {
    checkNotLogin(req, res);
    Auser.find({}, function (err, ausers) {
        if (err) {
            jsonpCallback();
        } else {
            res.render('admin/aindex', {
                title: '后台主页',
                ausers: ausers
            })
        }
    })

})

//后台新增用户模块
router.get('/newuser', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp(req, res)
    res.render('admin/newuser')
})
router.post('/newuser', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp(req, res)
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
            } else {
                res.redirect('/admin/index')
            }
        });

        //res.send('注册成功');
        //console.log("成功")
    }
})

//后台标签录入
router.get('/newlable', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
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
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    var lable = new Lable({
        lableid: req.body.lableid,
        lablename: req.body.lablename,
        f_id: req.body.f_id
    })
    lable.save(function (err, lables) {
        if (err) {
            callback(err)
        } else {
            res.send("success")
        }
    })

})

//后台标签修改
router.get('/lable/change/:lable_id', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    Lable.find({_id: req.params.lable_id}, function (err, clable) {
        if (err) {
            callback(err)
        } else {
            res.render('admin/change', {
                title: "标签更改",
                clable: clable
            })
        }

    })
})
router.post('/lable/change/:lable_id', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    var lable = {
        lableid: req.body.lableid,
        lablename: req.body.lablename,
        f_id: req.body.f_id
    }
    Lable.update({_id: req.params.lable_id}, {$set: lable}, function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/newlable')
        }
    })
})

//后台标签删除
router.get('/lable/del/:lable_id', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    Lable.remove({_id: req.params.lable_id}, function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/newlable')
        }
    })
})


//后台文章录入模块
router.get('/newarticle', function (req, res) {
    checkNotLogin(req, res);
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
    checkNotLogin(req, res);
    var article = new Article({
        articlename: req.body.articlename,
        articledate: req.body.articledate,
        articleview: req.body.articleview,
        lableid: req.body.lableid,
        articletext: req.body.articletext,
        articlewriter: "admin",
        //文章状态初始化为1，未审核阶段
        articlestate: 1
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
    checkNotLogin(req, res);
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
router.get('/article/change/:article_id', function (req, res) {
    checkNotLogin(req, res);
    Article.find({_id: req.params.article_id}, function (err, article) {
        if (err) {
            callback(err)
        } else {
            Lable.find({lableid: article[0].lableid}, function (err, lables) {
                if (err) {
                    callback(err)
                } else {
                    res.render('admin/articlechange', {
                        title: "文章修改",
                        article: article,
                        lables: lables
                    })
                }
            })

        }
    })

})
router.post('/article/change/:article_id', function (req, res) {
    checkNotLogin(req, res);
    var article = {
        articlename: req.body.articlename,
        articledate: req.body.articledate,
        articleview: req.body.articleview,
        lableid: req.body.lableid,
        articletext: req.body.articletext,
        articlewriter: "admin",
        //文章状态重新初始化为1，未审核阶段
        articlestate: 1
    }
    Article.update({_id: req.params.article_id}, {$set: article}, function (err) {
        if (err) {
            callback()
        } else {
            res.redirect('/admin/article')
        }
    })

})

//后台文章删除
router.get('/article/del/:article_id', function (req, res) {
    checkNotLogin(req, res);
    Article.remove({_id: req.params.article_id}, function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/article')
        }
    })

})

//后台审核通过
router.get('/article/agree/:article_id', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    var updata = {
        articlestate: 2
    }
    Article.update({_id: req.params.article_id}, {$set: updata}, function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/article')
        }
    })
})

//后台文章审核不通过
router.get('/article/disagree/:article_id', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    var updata = {
        articlestate: 1
    }
    Article.update({_id: req.params.article_id}, {$set: updata}, function (err) {
        if (err) {
            callback(err)
        } else {
            res.redirect('/admin/article')
        }
    })
})

//主页标签修改
router.get('/cindex', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    Mindex.find({}, function (err, mindex2) {
        if (err) {
            jsonpCallback();
        } else {
            if (mindex2[0] == null) {
                var mindex1 = {
                    mindex: [{
                        title1: 0,
                        title2: 0,
                        content1: 0,
                        title3: 0,
                        content2: 0,
                        stitle1: 0,
                        stitle2: 0,
                        stitle3: 0,
                        scontent1: 0,
                        scontent2: 0,
                        scontent3: 0,
                        email: 0,
                        phone: 0,
                        qq: 0
                    }]

                }
                res.render('admin/cindex', {
                    title: "主页面修改",
                    mindex: mindex1
                })
            } else {
                res.render('admin/cindex', {
                    title: "主页面修改",
                    mindex: mindex2
                })
            }

        }
    })
})

router.post('/cindex', function (req, res) {
    checkNotLogin(req, res);
    checkLoginp1(req, res)
    var cindex = {
        title1: req.body.title1,
        title2: req.body.title2,
        content1: req.body.content1,
        title3: req.body.title3,
        content2: req.body.content2,
        stitle1: req.body.stitle1,
        stitle2: req.body.stitle2,
        stitle3: req.body.stitle3,
        scontent1: req.body.scontent1,
        scontent2: req.body.scontent2,
        scontent3: req.body.scontent3,
        email: req.body.email,
        phone: req.body.phone,
        qq: req.body.qq
    }
    //判断是新增还是修改
    if (req.body._id == 0 || req.body._id == null) {
        mindex = new Mindex(cindex)
        mindex.save(function (err) {
            if (err) {
                callback()
            } else {
                res.redirect('/admin/cindex')
            }
        })
    } else {
        Mindex.update({_id: req.body._id}, {$set: cindex}, function (err) {
            if (err) {
                callback()
            } else {
                res.redirect('/admin/cindex')
            }
        })
    }

})


//主页图片修改

//前台反馈查看
router.get('/mail', function (req, res) {
    checkNotLogin(req, res);
    Mail.find({}, function (err, mails) {
        if (err) {
            jsonpCallback();
        } else {
            res.render('admin/mail', {
                title: '查看反馈',
                mails: mails
            })
        }
    })
})

//前台反馈查看

router.get('/mail/content/:mail_id', function (req, res) {
    checkNotLogin(req, res);
    Mail.find({_id: req.params.mail_id}, function (err, mail) {
        if (err) {
            jsonpCallback();
        } else {
            res.render('admin/mailcontent', {
                title: '反馈详情',
                mail: mail
            })
        }
    })
})
//前台反馈删除
router.get('/mail/del/:mail_id', function (req, res) {
    checkNotLogin(req, res);
    Mail.remove({_id: req.params.mail_id}, function (err) {
        if (err) {
            jsonpCallback();
        } else {
            res.redirect('/admin/mail')
        }
    })
})

//检测后台session权限(高级)
function checkLoginp(req, res) {
    if (req.session.power == 2) {
        res.redirect('/admin/index')
    }
    if (req.session.power == 3) {
        res.redirect('/admin/index')
    }

}
//检测后台session权限(中级)
function checkLoginp1(req, res) {
    if (req.session.power == 3) {
        res.redirect('/admin/index')
    }
}
//是否登录
function checkNotLogin(req, res) {
    if (!req.session.username && !req.session.power) {
        res.redirect('/admin');
    }
}

module.exports = router;