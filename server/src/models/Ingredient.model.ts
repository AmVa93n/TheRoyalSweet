import { Schema, model } from "mongoose";

const ingredientSchema = new Schema(
  {
    supermarkets: [String],
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

export default Ingredient;