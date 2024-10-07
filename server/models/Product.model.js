const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
