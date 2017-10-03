var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["basic", "cloze"];

var basicArray = [];
var clozeArray = [];

function deleteCard() {

  inquirer.prompt([{
    name: "confirm",
    type: "confirm",
    message: "Would you like to delete a flashcard?"
  }]).then(function(answer) {

    if (answer.confirm === true) {

      inquirer.prompt([{
        name: "typeCard",
        type: "list",
        message: "Which type of card would you like to delete?",
        choices: choices
      }]).then(function(typeDelete) {
        if (typeDelete.typeCard === "basic") {
          deleteBasic();
        } else if (typeDelete.typeCard === "cloze") {
          deleteCloze();
          console.log("you chose cloze delete");
        }
      });
    } else {
      console.log("Session over");
    }
  });

}

function deleteBasic() {
  fs.readFile("basic.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      basicArray = [];
      myData = JSON.parse(data);
      for (i = 0; i < myData.length; i++) {
        basicArray.push(myData[i].front);
      }
      inquirer.prompt([{
        name: "front",
        type: "list",
        message: "Which card would you like to delete?",
        choices: basicArray
      }]).then(function(response) {
        var number = 0;
        for (var i = 0; i < basicArray.length; i++) {
          if (myData[i].front === response.front) {
            number = i;
          }
        }
        myData.splice(number, 1);
        fs.writeFile("basic.txt", JSON.stringify(myData, null, 4), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Removed!");
            deleteCard();
          }
        });
      });
    }
  });
}

function deleteCloze() {
  fs.readFile("cloze.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      clozeArray = [];
      myData = JSON.parse(data);
      for (i = 0; i < myData.length; i++) {
        clozeArray.push(myData[i].fullText);
      }
      inquirer.prompt([{
        name: "fullText",
        type: "list",
        message: "Which card would you like to delete?",
        choices: clozeArray
      }]).then(function(response) {
        var number = 0;
        for (var i = 0; i < clozeArray.length; i++) {
          if (myData[i].fullText === response.fullText) {
            number = i;
          }
        }
        myData.splice(number, 1);
        fs.writeFile("cloze.txt", JSON.stringify(myData, null, 4), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Removed!");
            deleteCard();
          }
        });
      });
    }
  });
}

module.exports = { deleteCard };