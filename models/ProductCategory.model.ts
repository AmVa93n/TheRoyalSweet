import { Schema, model, models } from "mongoose";

const productCategorySchema = new Schema(
  {
    name: { en: String, pt: String }, 
    multipliers: { small: Number, medium: Number, big: Number }, 
    serving: { 
      small: { en: String, pt: String }, 
      medium: { en: String, pt: String }, 
      big: { en: String, pt: String } 
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

export default models.ProductCategory || model("ProductCategory", productCategorySchema);