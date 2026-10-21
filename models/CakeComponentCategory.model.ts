import { Schema, model, models } from "mongoose";

const cakeComponentCategorySchema = new Schema(
  {
    name: { en: String, pt: String }, 
    multipliers: { small: Number, medium: Number, big: Number },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

export default models.CakeComponentCategory || model("CakeComponentCategory", cakeComponentCategorySchema);