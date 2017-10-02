var inquirer = require("inquirer");
var fs = require("fs");

var clozeCards = function(fullText, cloze, partial) {
  this.fullText = fullText;
  this.cloze = cloze;
  this.partial = fullText.replace(cloze, "...");
};

function createCloze() {
  inquirer.prompt([{
    name: "fullText",
    message: "What statement do you want on your flashcard?"
  }, {
    name: "cloze",
    message: "What text do you want removed?"
  }]).then(function(answers) {
    var clozeCard = new clozeCards(answers.fullText, answers.cloze);
    fs.appendFile("cloze.txt", JSON.stringify({ fulltext: clozeCard.fullText, cloze: clozeCard.cloze, partial: clozeCard.partial }), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Content Added!");
        inquirer.prompt([{
          name: "confirm",
          type: "confirm",
          message: "Would you like to make a another flashcard?"
        }]).then(function(next) {
          if (next.confirm === true) {
            createCloze();
          } else {
            console.log("You have finished making flashcards.");
          }
        });
      }
    });
  });
}

function getCloze(data) {
  console.log(data);
  console.log(data.length);

}


// var a = [];
// var b = [];

// console.log(data);
// return Array.from(data);

// var cards = JSON.stringify(data);
// console.log(cards);// // a.push(data);
// console.log(a);
// console.log(a.length);
// b = a.replace(/'/g, "");
// console.log(b);
// console.log(b.length);
// console.log("Some text");
// if (data.constructor == Array) {
//   console.log("Im array")
// } else if (data.constructor == Object) {
//   console.log("I'm object");
// } else if (data.constructor == String) {
//   console.log("i'm a string");
// } else {
//   console.log("Im not either");

// }
// console.log(cards);
// 
// var numberOfCards = Object.keys(cards).length;
// console.log(numberOfCards);


// fs.readFile('log.txt', 'utf8', function(err, data) {

// console.log(studyCloze);
// 
//   Math random
//   fs.readFile clozeCards.partial
//   waiting
//   for input
//   user input === clozeCards.cloze
//   regEx101.com
//   function

module.exports = {
  clozeCards,
  createCloze,
  getCloze
};