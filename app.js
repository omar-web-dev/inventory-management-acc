const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// Schema ➡ module ➡ query

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting route
const productRoute = require('./route/product.route')

app.use("/api/v1/product", productRoute);

module.exports = app;
