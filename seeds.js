const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("CONNECTION ESTABLISHED SUCESSFULLY");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

const p = new Product({
  name: "Grape",
  price: 1.99,
  category: "fruit",
});

const seedProducts = [
  {
    name: "mango",
    price: "2.90",
    category: "fruit",
  },
  {
    name: "tomato",
    price: "5.90",
    category: "vegetable",
  },
  {
    name: "banana",
    price: "6.90",
    category: "fruit",
  },
  {
    name: "milk",
    price: "4.50",
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((p) => {
    console.log(p);
  })
  .catch((err) => {
    console.log(err);
  });
