var basicCard = require("./basicCard.js");
var clozeCard = require("./clozeCard.js");
var deleteCard = require("./deleteCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["basic", "cloze"];

inquirer.prompt([{
  name: "choice",
  type: "list",
  message: "What would you like to do?",
  choices: ["create a flashcard", "study", "delete a flashcard"]
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
  } else if (response.choice === "study") {
    console.log("You picked " + response.choice);
    inquirer.prompt([{
      name: "card",
      type: "list",
      message: "What type of card do you want to study with?",
      choices: choices
    }]).then(function(responseCard) {
      if (responseCard.card === "basic") {
        console.log("You picked study with basic flashcards");
        basicCard.getBasic();

      } else if (responseCard.card === "cloze") {
        console.log("You picked study with cloze flashcards");
        clozeCard.getCloze();
      }
    });
  } else if (response.choice === "delete a flashcard") {
    deleteCard.deleteCard();
  }
});