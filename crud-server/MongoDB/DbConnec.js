const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB seccessfuly");
  } catch (error) {
    console.log("not connected" + error);
  }
};

module.exports = connection;
