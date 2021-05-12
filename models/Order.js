const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerName: String,
  date: {
      type:Date,
      default:Date.now
  },
  donuts:[
    {
        type: Schema.Types.ObjectId,
        ref: "Donut"
      }
  ]
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
