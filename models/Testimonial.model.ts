import { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema(
  {
    text: String,
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

export default models.Testimonial || model("Testimonial", testimonialSchema);