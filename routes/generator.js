'use strict';

var express = require('express');
var router = express.Router();
//import words for bakasum
var words = require('../helpers/words');
//import generator helper
var g = require('../helpers/generator');
//create new instance of generator object
//pass in bakaipsum word dictionary
var bakasum = new g(words);

router.get('/g', function(req, res, next) {
  var paragraphs = req.query.paragraphs;
  //check if paragraphs is a number else default to 5
  paragraphs = parseInt(paragraphs) || 5;
  //lets set our max paragraphs to 20
  //Does anyone really need 1000 bakaipsum paragraphs?
  paragraphs = paragraphs > 20 ? 20 : paragraphs;
  res.render('generator', {
    bakasumText : bakasum.buildBakasum(paragraphs)
  });
});

module.exports = router;
