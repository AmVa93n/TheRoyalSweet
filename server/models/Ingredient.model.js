const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    supermarket: String,
    brand: String,
    name: String,
    recipeUnits: String,
    pricePerUnit: Number,
    price: Number,
    unitsPerPackage: Number,
    packageUnits: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
