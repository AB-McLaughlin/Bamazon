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
console.log('\n');

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
      
        var shop = function() {
            INQUIRER.prompt([{
                name: "buyID",
                type: "input",
                message: "Please input the ItemID of the product you would like to purchase",
                validate: function(value) {
                    if (isNaN === true) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }, 
            //* The second message should ask how many units of the product they would like to buy. 
            {
                name: "howMany",
                type: "input",
                message: "How many would you like?",
                validate: function(value) {
                    if (isNaN === true) {
                        return false;
                    } else {
                        return true;
                    }
                }
                
            }]).then(function(answer) {
                var stockQuery = 'SELECT * FROM Products WHERE itemID=' + answer.buyID;
                connection.query(stockQuery, function(err, res) {
                    if (answer.howMany <= res[0].QuantityOnHand) {
                        console.log('\n');
                        console.log("We currently have " + res[0].QuantityOnHand + " " + res[0].ProductName + " available.");
                        console.log('\n');
                        console.log("Thank you for shopping Bamazon! Your order of "+ answer.howMany + " " + res[0].ProductName + " is now being processed.");
                        console.log('\n');
                        console.log("Anything else you need today?  If you are finished, please press Ctrl+C");
                        console.log('\n');
                        displayProducts();  
                      } 
                      else if (answer.howMany >= res[0].QuantityOnHand) {
                      console.log('\n');  
                      console.log("Sorry, we have " + res[0].QuantityOnHand + " of " + res[0].ProductName +" in stock to fill your order.");
                      console.log("Please submit try again");
                      console.log('\n');
                        shop();
                      }   
                        else{
                            shop();
                            };  
                });
            });
        }
        
        
        
            
