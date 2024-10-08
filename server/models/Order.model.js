const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    email: String,
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product'},
        size: String,
        quantity: Number
    }],
    pickup: Boolean,
    shipping: {
        city: String,
        address: String,
        zip: String,
    },
    total: Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;