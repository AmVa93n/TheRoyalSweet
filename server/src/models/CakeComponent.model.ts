import { Schema, model } from "mongoose";

const cakeComponentSchema = new Schema(
  {
    name: {en: String, pt: String},
    recipe: [{
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient'},
      amount: Number
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

const CakeComponent = model("CakeComponent", cakeComponentSchema);

export default CakeComponent;