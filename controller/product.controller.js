const Product = require("../Model/Product");

exports.getProduct =  async (req, res, next) => {
    try {
      // const result = await Product.find({
      //   name: "Rice",
      //   price: "100",
      //   status: "low-stock",
      // });
      // const result = await Product.find({$or : [{_id : '646eda27e9ce7a366453cfce'},{name : 'Rice'}]}); //or filter
      // const result = await Product.find({status : {$ne : 'out-of-stock'}}); // with out this status filter
      // const result = await Product.find({price : {$lte : 100}}); //  filter fo geter den
      // const result = await Product.find({}, 'name price'); //  show only name and price
      // const result = await Product.find({}, '-name -price'); // all data show with out name and price
      const result = (await Product.find({}, '-name -price')).sort({price : 1}); // all data show with out name and price
  
      if (result.length === 0) {
        res.status(200).json({
          status: "Success",
          message: "No fount product",
          totalData: result.length,
        });
      }
  
      res.status(200).json({
        status: "Success",
        message: "All product get successfully",
        totalData: result.length,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "Flied",
        message: "Product conn't get",
        error: error.message,
      });
    }
  }

exports.postProduct =  async (req, res, next) => {
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
  }