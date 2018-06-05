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
  console.log(err);
  displayProducts();
});

    var displayProducts = function() {
        var displayQuery = 'SELECT * FROM products'
        connection.query(displayQuery, function(err, res) {
            for (var i = 0; i < res.length; i++) {
               // console.log("Item ID: " + res[i].ItemID + " || Product: " + res[i].ProductName + " || Price: " + res[i].Price + "");
               CONSOLETABLE(res);
            }
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
                message: "Please input the item ID of the product you would like to buy",
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
                message: "How many would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]).then(function(answer) {
                var stockQuery = 'SELECT * FROM Products WHERE itemID=' + answer.howMany;
                connection.query(query, function(err, res) {
                  if (answer.howMany <= res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("We currently have " + res[i].stockQuantity + " " + res[i].productName + ".");
                        console.log("Thank you for your patronage! Your order of "+ res[i].stockQuantity + " " + res[i].productName + " is now being processed.");
                      }
                    } else {
                      console.log("Not enough of this product in stock.");
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
    

 
