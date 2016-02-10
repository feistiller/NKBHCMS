var express = require('express');
var moment = require('moment');
var router = express.Router();
//标签模型引入
var lablemodel = require('../models/lablemodel');
var Lable = lablemodel.Lable;
//文章模型引入
var articlemodel = require('../models/articlemodel');
var Article = articlemodel.Article;
//文章评论引入
var talkmodel=require('../models/talkmodel');
var Talk=talkmodel.Talk;
//前台页面内容引入
var mindexmodel=require('../models/indexmodel');
var Mindex=mindexmodel.Mindex;

var lables=Lable.find();


/* GET home page. */
//1./主页
router.get('/', function(req, res, next) {
  Mindex.find({}, function (err, mindex) {
    if (err) {
      callback(err)
    } else {

          res.render('index', {
            title: "NKBH CMS系统v0.1",
            //articles: articles,
            //lables:lables,
            mindex:mindex

          })

    }
  })
});


//3./article文章详情与评论详情
router.get('/article/:article_id', function (req, res) {
    Article.find({_id:req.params.article_id}, function (err, article) {
      if(err){
        callback(err)
      }else{
        Lable.find({lableid:article[0].lableid}, function (err, lable) {
          if(err){
            callback(err)
          }else{
            Talk.find({articleid:req.params.article_id}, function (err, talks) {
              res.render('index/article',{
                title:"文章详情",
                article:article,
                lable:lable,
                talks:talks,
                lables:lables
              })
            })

          }
        })

      }
    })
});
//评论的写入
router.post('/article/:article_id', function (req, res) {
  if(checkLogin(req,res)) {
    var talk = new Talk({
      articleid: req.params.article_id,
      userid:req.session.username,
      //评论内容
      talktext: req.body.talktext,
      talkdate: moment().format('L'),
      //评论点赞
      talkup: 0,
      talkdown: 0,
    })
    talk.save(function (err) {
      if (err) {
        callback()
      } else {
        res.redirect('/article/' + req.params.article_id)
      }
    })
  }
});
//4./type根据类型查找到其文章目录
router.get('/type/:lableid', function (req,res) {
  Article.find({lableid:req.params.lableid}, function (err, articles) {
    if (err) {
      callback(err)
    } else {

          res.render('index', {
            title: "NKBH CMS系统v0.1",
            articles: articles,
            lables:lables

          })
        }
      })
});
router.post('/type', function () {

});
//5./post
router.get('/post', function () {

});
router.post('/post', function () {

});
//6./reg
router.get('/reg', function () {

});
router.post('/post', function () {

});

//检测session登录
function checkLogin(req, res) {
  if (!req.session.username) {
    res.redirect('../users/login')
    return 0
  }else{
    return 1
  }
}
module.exports = router;
