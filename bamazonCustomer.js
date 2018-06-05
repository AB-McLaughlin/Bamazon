const MYSQL = require("mysql");
const INQUIRER = require("inquirer");
const CONSOLETABLE = require("console.table");

var connection = MYSQL.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
    displayProducts();
});

console.log('\n');
console.log("******Welcome to Bamazon!******" + '\n');
console.log(" Here are today's deals:" + '\n');

    var displayProducts = function() {
        var displayQuery = 'SELECT ItemID, ProductName, Price FROM products'
        connection.query(displayQuery, function(err, res) {
            console.table(res);
                console.log('\n');
                    shop();
        })
    };
//The app should then prompt users with two messages.
      //* The first should ask them the ID of the product they would like to buy.
      //* The second message should ask how many units of the product they would like to buy.

        var shop = function() {
            INQUIRER.prompt([{
                name: "buyID",
                type: "input",
                message: "Please input the ItemID of the product you would like to purchase",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                name: "howMany",
                type: "input",
                message: "How many would you like?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]).then(function(answer) {
                var stockQuery = 'SELECT QuantityOnHand FROM Products WHERE itemID=' + answer.howMany;
                connection.query(stockQuery, function(err, res) {
                    
                    if (answer.howMany <= res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("We currently have " + res[i].QuantityOnHand + " " + res[i].productName + ".");
                        console.log("Thank you for shopping Bamazon! Your order of "+ res[i].QuantityOnHand + " " + res[i].productName + " is now being processed.");
                      }
                    } else {
                      console.log('\n');  
                      console.log("Sorry, not enough of this product in stock.");
                      console.log("Is there anything else you would like?");
                      console.log('\n');  
                    }
                        displayProducts();
                })
            })
        };


          //  });
         // function runSearch() {
            // inquirer.prompt({
            //     name: "products",
            //     type: "list",
            //     message: "What are you shopping for today?",
            //     choices: function() {
            //         var choiceArray = [];
            //         for (var i = 0; i < results.length; i++) {
            //           choiceArray.push(results[i].item_id + results[i].product_name + results[i].price);
            //           console.log (choiceArray.toString());
            //         }
            //         return choiceArray;
            //       },
            //   })
        // }
      
    // })
// };
    
        
