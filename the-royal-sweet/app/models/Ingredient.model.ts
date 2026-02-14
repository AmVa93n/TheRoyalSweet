import { Schema, model, models } from "mongoose";

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

export default models.Ingredient || model("Ingredient", ingredientSchema);