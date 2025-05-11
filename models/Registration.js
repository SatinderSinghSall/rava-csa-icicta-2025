import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  category: String,
  institution: String,
  country: String,
  type: { type: String, enum: ["Presentation", "Participant"] },
  srnOrCollegeId: String,
  programmeName: { type: String, enum: ["MCA", "M.SC", "Others"] },
  paperTitle: String,
  amountPaid: { type: Number, enum: [1300, 300, 250] },
  transactionNumber: String,
  guideName: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", registrationSchema);
