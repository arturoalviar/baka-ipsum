var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { pageTitle : "Bakasum | About"});
});

module.exports = router;
