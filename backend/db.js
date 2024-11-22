const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(
      "mongodb+srv://tarunchaudhary630:AdminAdmin@cluster0.sndoa.mongodb.net/miniProject?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
