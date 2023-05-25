const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    UseNewUrlParser: true;
    UseUnifiedTopology: true;

    console.log("database connection successfully" .blue.bold);
  })
  .catch((error) => {
    if (error) {
      console.log(error);
    }
  });

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
