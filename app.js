const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// Schema ➡ module ➡ query

// {
//   "name": "Rice",
//   "description": "Rice is big price in markets",
//   "price": 100,
//   "unit": "kg",
//   "quantity": 500,
//   "status" : "in-stock"
// }

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Product name"],
    trim: true,
    unique: [true, "Have similar name product in your stock"],
    minLength: [3, "Product name must be 3 characters"],
    maxLength: [20, "Product name Is to large"],
  },
  description: {
    type: String,
    required: [true, "Please don't empty product description"],
  },
  price: {
    type: Number,
    required: true,
    min: [true, " Price can be Negative"],
  },
  // unit: {
  //   type: String,
  //   required: true,
  //   enum: {
  //     values: '["kg", "litter", "pcs"]',
  //     massage: "Unit value can't be {VALUE}, must be kg/litter/pcs",
  //   },
  // },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity can't be Negative"],
    validate: {
      validator: (value) => {
        const integer = Number.isInteger(value);
        if (integer) {
          return true;
        } else {
          return false;
        }
      },
    },
    massage: "Product quantity can't be Integer number",
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "low stock"],
      massage: "Status can't be {VALUE",
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  categories: [
    {
      name: { type: String, require: true },
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

// middleware

productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stack";
  }
  next()
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting route

app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = await new Product(req.body);
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // } else if (product.quantity <= 3) {
    //   product.status = "low stock";
    // }
    const result = await product.save();
    res.status(200).json({
      status: "Success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Flied",
      message: "Product insert Flied",
      error: error.message,
    });
  }
});

module.exports = app;
