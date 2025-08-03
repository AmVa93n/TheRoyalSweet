import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    email: String,
    phone: String,
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        price: Number,
    }],
    pickup: Boolean,
    shipping: {
        city: String,
        address: String,
        zip: String,
    },
    deliveryDate: Date,
    additionalIngredients: [{
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient'},
        amount: Number
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;