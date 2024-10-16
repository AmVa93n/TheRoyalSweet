const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {en: String, pt: String},
    intro: {en: String, pt: String},
    description: {en: String, pt: String},
    serve: {en: String, pt: String},
    store: {en: String, pt: String},
    price: {
        small: Number,
        medium: Number,
        big: Number,
    },
    images: [String],
    recipe: [{
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient'},
      amount: Number
    }],
    category: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
