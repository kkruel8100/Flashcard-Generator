var basicCard = require("./basicCard.js");
var clozeCard = require("./clozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["basic", "cloze"];

var length = 10;
var random = Math.floor((Math.random() * length) + 1);
console.log(random);

inquirer.prompt([{
  name: "choice",
  type: "list",
  message: "What would you like to do?",
  choices: ["create a flashcard", "study"]
}]).then(function(response) {
  if (response.choice === "create a flashcard") {
    inquirer.prompt([{
      name: "card",
      type: "list",
      message: "What type of flashcard?",
      choices: choices
    }]).then(function(responseCard) {
      if (responseCard.card === "basic") {
        console.log("You picked create a basic flashcard");
        basicCard.createBasic();
      } else if (responseCard.card === "cloze") {
        console.log("You picked create a cloze flashcard");
        clozeCard.createCloze();
      }
    });
  } else {
    console.log("You picked " + response.choice);
    inquirer.prompt([{
      name: "card",
      type: "list",
      message: "What type of card do you want to study with?",
      choices: choices
    }]).then(function(responseCard) {
      if (responseCard.card === "basic") {
        console.log("You picked study with basic flashcards");
        fs.readFile("basic.txt", "utf8", function(err, data) {
          if (err) {
            console.log(err);
          }
          myData = JSON.parse(data);
          basicCard.getBasic(myData);
          // console.log(myData.length);
        });

      } else if (responseCard.card === "cloze") {
        console.log("You picked study with cloze flashcards");
        fs.readFile("cloze.txt", "utf8", function(err, data) {
          if (err) {
            console.log(err);
          }
          clozeCard.getCloze(data);
        });
      }
    });
  }
});