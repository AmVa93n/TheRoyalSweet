import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, enum: ['en', 'pt'] },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product'},
        customCake: { 
          label: String,
          dough: { type: Schema.Types.ObjectId, ref: 'CakeComponent'},
          filling: { type: Schema.Types.ObjectId, ref: 'CakeComponent'},
          frosting: { type: Schema.Types.ObjectId, ref: 'CakeComponent'},
          topping: { type: Schema.Types.ObjectId, ref: 'CakeComponent'},
        },
        size: { type: String, default: 'small' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        note: { type: String, default: '' },
    }],
    pickup: Boolean,
    shipping: {
        city: { type: String, default: '' },
        address: { type: String, default: '' },
        zip: { type: String, default: '' },
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

export default models.Order || model("Order", orderSchema);