DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE Bamazondb;

USE Bamazondb;

CREATE TABLE Products(
    ItemID INT NOT NULL,
    ProductName VARCHAR(40),
    DeptName VARCHAR(40),
    Price DECIMAL(10,2),
    QuantityOnHand INTEGER,
    PRIMARY KEY (ItemID)
    );

INSERT INTO Products
VALUES(101, "Fun with Paperclips", "PrintMedia", 12.99, 25),(102, "You Can Do IT", "PrintMedia", 19.99, 34),(103, "Thermal Coffee Mug", "ToGo", 14.69, 298), (104, "Bento Lunchbox, medium", "ToGo", 23.00, 57), (105, "Leopard Print Pajamas", "GirlsClothing", 38.99, 468), (106, "Formal Smocked Dress, blue", "GirlsClothing", 75.00, 28), (107, "Almost Instant Pot", "Kitchen", 62.39, 333), (108, "KA Oval Dish", "Kitchen", 45.50, 20), (109, "Kleenex tissues", "Household", 6.99, 546),(110, "MR TP, 50 pack", "Household", 72.49, 80);




