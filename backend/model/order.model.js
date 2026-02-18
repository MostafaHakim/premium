const mongoose = require("mongoose");

const tickeetSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
  },
  buyDate: {
    type: Date,
    required: true,
  },

  drawDate: {
    type: Date,
    required: true,
  },

  isExpired: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "used", "won"],
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    transectionId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tickets: [tickeetSchema],
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
