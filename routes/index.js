var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tessel', function(req, res, next) {
  res.end("hello");
});

router.post('/tessel', function(req, res, next) {
  res.write("post works");

});
module.exports = router;
