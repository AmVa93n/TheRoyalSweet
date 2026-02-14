import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {en: String, pt: String},
    intro: {en: String, pt: String},
    description: {en: String, pt: String},
    serve: {en: String, pt: String},
    store: {en: String, pt: String},
    images: [String],
    recipe: [{
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient'},
      amount: Number,
      component: String,
    }],
    recipeComponents: [{
      name: String,
      multiplier: Number,
    }],
    category: String,
    workHours: Number,
    electricityHours: Number,
    internal: { type: Boolean, default: false },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

export default models.Product || model("Product", productSchema);