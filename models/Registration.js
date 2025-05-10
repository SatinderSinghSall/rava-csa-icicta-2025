import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  category: String,
  institution: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", registrationSchema);
