var inquirer = require("inquirer");
var fs = require("fs");

var basicCard = function(front, back) {
  this.front = front;
  this.back = back;
};

var cardArray = [];

function createBasic() {

  inquirer.prompt([{
    name: "front",
    message: "What question do you want on your flashcard?"
  }, {
    name: "back",
    message: "What is the answer to your question?"
  }]).then(function(answers) {
    // var basic = new basicCard(JSON.stringify(answers.front).replace(/"/g, ''), JSON.stringify(answers.back).replace(/"/g, ''));
    var basic = new basicCard(answers.front, answers.back);
    cardArray.push(basic);


    inquirer.prompt([{
      name: "confirm",
      type: "confirm",
      message: "Would you like to make a another flashcard?"
    }]).then(function(next) {
      if (next.confirm === true) {
        createBasic();
      } else {
        console.log("You have finished making flashcards.");
        fs.appendFile("basic.txt", JSON.stringify(cardArray, null, 4), function(err) {
          // fs.appendFile("basic.txt", JSON.stringify({ front: basic.front, back: basic.back }, null, 4), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Added!");
          }

        });
        // console.log(cardArray.length);
      }
    });
  });
}

var test = [];

function getBasic(data) {
  console.log(data.length);
  console.log(data[0].back);
  // var objEnd = new Regex('/(}{)/', 'g');
  // var data = data.replace(objEnd, '},{');
  // test.push(data);
  // console.log(test.length);

  // var result = JSON.parse(data);

  // var myObj = JSON.parse(data);
  // console.log(myObj);
  // console.log(myObj.length);
  // var arr = wrapArray(data);
  // // console.log(arr);
  // // var result = JSON.stringify(data);
  // // console.log(result);
  // console.log(arr);
  // console.log(data.length);
  // test.push(data);
  // console.log(test);
  // console.log("Length: " + test.length);
  // var frontQ = test.map(single => `${single.front}`);
  // console.log(frontQ);
}

module.exports = {
  basicCard,
  createBasic,
  getBasic
};