var express = require('express');
var router = express.Router();

/* GET home page. */
//1./主页
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页' });
});
//2./user信息页
router.get('/user/:user', function (req, res) {

  res.render('index', {title: 'Expresss'});

});

//3./article
router.get('/article/:name/:day/:title', function (req, res) {

});
router.post('/article/:name/:day/:title', function (req, res) {

});
//4./type
router.get('/type', function () {

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
//7./login
router.get('/login', function () {

});
router.post('/login', function () {

});
//8./lgout
router.post('/lgout', function () {

});
//9./admin/index
router.get('/admin/index', function () {

});
router.post('/admin/index', function () {

});
//10./admin/aindex
router.get('/admin/aindex', function () {

});
//11./admin/type
router.get('/admin/type', function () {

});
router.post('/admin/type', function () {

});
//12./admin/article
router.get('/admin/article/:name/:day/:title', function () {

});
router.post('/admin/article/:name/:day/:title', function () {

});
//13./admin/reindex
router.get('/admin/reindex', function () {

});
//14./admin/user
router.get('/admin/user', function () {
  var users={}
  res.render('/admin/user', {
    title: '主页',
    users:users
  });


});

module.exports = router;
