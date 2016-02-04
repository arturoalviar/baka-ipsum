'use strict';

//Create Generator constructor
var Generator = function(words){
  this.words = words;
  this.wordLength = words.length;
  this.punctuation = ['.', ',', ', ne?',' yo!'];
  this.punctuationLen = this.punctuation.length;
  this.SENTENCES = 7;
}


//get a random word from a word list
Generator.prototype.randomWord = function(){
  return this.words[Math.floor(Math.random() * this.wordLength)];
}

//choose sentence length build it and add a random punctuation mark
Generator.prototype.buildSentence = function(){
  var sentenceLength = Math.floor(Math.random() * (12 - 6 + 1) + 6);
  var sentence = [];

  for(var s = 0; s < sentenceLength; s++){
    sentence.push(this.randomWord());
  }
  var rand = Math.floor(Math.random() * this.punctuationLen);

  var end = this.punctuation[rand];

  return sentence.join(' ') + end;
}

//build a paragraph and add p tags
Generator.prototype.buildParagraph = function(){
  var paragraph = [];

  for(var i = 0; i < this.SENTENCES; i++){
    paragraph.push(this.buildSentence());
  }

  //capitalize the first letter of each sentence
  paragraph = paragraph.map(function(d){
    return d[0].toUpperCase() + d.slice(1) ;
  });

  return '<p>' + paragraph.join(' ') + '</p>';
}

//generate ipsum text based on user selected paragraph number
Generator.prototype.buildBakasum = function(paragraphs){
  var finalText = [];
  for(var i = 0; i < paragraphs; i++){
    finalText.push(this.buildParagraph());
  }
  //join array into one big string
  return finalText.join(' ');
}

module.exports = Generator;
