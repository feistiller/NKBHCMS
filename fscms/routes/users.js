/*2016.1.22每一个对于id的接受都应该有防止注入的手段
* 进度缓慢也是醉了
* */
////////////////////////////////////////////////////////////////////////////////////////////
//代码开始
var express = require('express');
var router = express.Router();
//引入models文件夹下面的usermodel.js
var usermodel = require('../models/usermodel');
//User是models.js返回的实例,exports.User = mongoose.model("User",userSchema);
var User = usermodel.User;

/* GET users listing. 路由开始处*/
//添加注册页面显示
router.get('/reg', function (req, res) {
    res.render('reg', {title: '注册'})

})
//对于注册的事件的处理
router.post('/reg', function (req, res) {
    var username = req.body.add_username
    var password = req.body.add_password
    var repassword = req.body.re_password
    var mail = req.body.mail
    if (password != repassword) {
        res.send('密码重复错误');
        //console.log("密码错误")
    } else {
        var user = new User({
            username: username,
            password: password,
            mail:mail,
            talk:1
        });
        user.save(function (err) {
            if (err) {
                callback(err);
            }
        });
        res.send('注册成功');
        //console.log("成功")
    }
});


//登录
router.get('/login', function (req, res) {
    res.render('login')
})
router.post('/login', function (req, res) {
    var user={
        username:req.body.username,
        password:req.body.password

    }
    User.findOne({username:user.username}, function (err, usercherk) {
        if (err) {
            callback(err);
        }
        //res.send(usercherk)
        if(usercherk.password!=user.password){
            res.send("用户名或者密码输入错误")
        }else{
            req.session.username=user.username
           res.send("登录成功")
        }
    });
});

//用户管理
router.get('/', function (req, res) {
    User.find({}, function (err,users) {
        if (err) {
            callback(err);
        }
        //res.send(users)
        res.render('admin/user', {
            title: '用户管理',
            users:users
        });
    })

})

//用户个体和密码重置
router.get('/change/:user_id', function (req, res) {
    User.find({_id:req.params.user_id},function (err, user) {
        if(err){
            callback(err)
        }
        //调用模板
        //res.send(user);
        res.render('admin/cuser',{
            title:'个人用户修改',
            user:user,
            i:1
        })
    })

})
router.post('/change/:user_id', function (req, res) {
    if(req.body.new_password!=req.body.renew_password){
        res.send('密码不成功')
    }else{
        //Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);
        User.update({_id:req.params.user_id},{$set:{password:req.body.renew_password}}, function (err, re) {
            if(err){
                callback(err)
            }
            res.send('success')
        })
    }

})

//查询用户的文章
router.get('/query/:user', function (req, res) {
    //查询user,以json格式返回到浏览器
    User.find(function (err, doc) {
        if (err) {
            callback(err);
        }
        res.json(doc);
    });
});


//删除'
router.get('/del/:user_id', function (req, res) {
    //console.log(req.params.user_id);
    User.remove({_id:req.params.user_id}, function (err, doc) {
        if (err) {
            callback(err);
        }
        //输出删除的条数
        //console.log(doc);
        res.redirect('/users')
    });
});

//cherk login or not
function checkLogin(req, res) {
    if (!req.session.username) {
        res.redirect('../users/login')
        return 0
    }else{
        return 1
    }
}

function checkNotLogin(req, res, next) {
    if (req.session.username) {
        res.redirect('back');
    }
    next();
}


module.exports = router;
