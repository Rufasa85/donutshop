const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DonutSchema = new Schema({
  name: String,
  price: Number,
  hasNuts:Boolean
});

const Donut = mongoose.model("Donut", DonutSchema);

module.exports = Donut;
