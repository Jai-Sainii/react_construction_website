import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String }, // Can be number or string like "$5000"
    features: { type: [String], default: [] }, // List of key features
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
