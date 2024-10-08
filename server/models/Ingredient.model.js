const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    supermarket: String,
    brand: String,
    name: String,
    units: String,
    priceperunit: Number,
    image: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
