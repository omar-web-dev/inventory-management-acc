const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Product name"],
    trim: true,
    unique: true, 
    validate: {
      validator: async function (value) {
        const count = await this.model("Product").countDocuments({ name: value });
        console.log(count, 'll')
        return count === 0; 
      },
      message: "This name already exists. Please choose a different name.",
    },
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
  } else if (this.quantity <= 3) {
    this.status = "low stock";
  }
  next();
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
