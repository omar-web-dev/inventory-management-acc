const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// schema design
// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide a Product name"],
//     trim: true,
//     unique: true,
//     minLength: [3, "Product name must be 3 characters"],
//     maxLength: [20, "Product name Is to large"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please don't empty product description"],
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: [true, " Price can be Negative"],
//   },
//   unit: {
//     type: String,
//     required: true,
//     enum: {
//       values : '["kg", "litter", "pcs"]',
//       massage: "Unit value can't be {VALUE}, must be kg/litter/pcs",
//     },
//     quantity: {
//       type: 0,
//       required: true,
//       min: [0, "quantity can't be Negative"],
//       validate: {
//         validator: (value) => {
//           const integer = Number.isInteger(value);
//           if (integer) {
//             return true;
//           } else {
//             return false;
//           }
//         },
//       },
//       massage: "Product quantity can't be Integer number",
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: {
//         values: ["in-stock", "out-of-stock", "discontinued"],
//         massage: "Status can't be {VALUE",
//       },
//     },
//   },
//    timestamps: true,
// });

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Product name"],
    trim: true,
    unique: true,
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
  unit: {
    type: String,
    required: true,
    enum: {
      values: '["kg", "litter", "pcs"]',
      massage: "Unit value can't be {VALUE}, must be kg/litter/pcs",
    },
  },
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
      values: ["in-stock", "out-of-stock", "discontinued"],
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

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
