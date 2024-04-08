const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
var methodOverride = require("method-override");
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("CONNECTION ESTABLISHED SUCESSFULLY");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render("products/index", { products });
});
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Product.findById(id);
  res.render("products/show", { item });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
