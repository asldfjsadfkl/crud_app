const mongoose = require("mongoose");

const shcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
});

module.exports = new mongoose.model("LIST", shcema);
