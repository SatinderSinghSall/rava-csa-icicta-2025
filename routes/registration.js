import express from "express";
import Registration from "../models/Registration.js";
import Joi from "joi";
import { verifyToken } from "../middleware/auth.js";
import { sendConfirmationEmail } from "../services/emailService.js";

const router = express.Router();

//! Joi schema for validation
const registrationSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  category: Joi.string().required(),
  institution: Joi.string().required(),
  country: Joi.string().required(),
  type: Joi.string().valid("Presentation", "Participant").required(),
  srnOrCollegeId: Joi.string().required(),
  programmeName: Joi.string().valid("MCA", "M.SC", "Others").required(),
  paperTitle: Joi.string().required(),
  amountPaid: Joi.number().valid(1300, 300, 250).required(),
  transactionNumber: Joi.string().required(),
  guideName: Joi.string().required(),
});

//! Route to add a new registration:
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        error: error.details.map((d) => d.message),
      });
    }

    // Check for duplicate registration by email
    const existingUser = await Registration.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Save new registration
    const newEntry = new Registration(req.body);
    await newEntry.save();

    await sendConfirmationEmail(newEntry.email, newEntry.fullName);
    res
      .status(201)
      .json({ message: "Registration successful and email sent." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message || "Something went wrong, please try again later.",
    });
  }
});

//! Route to get all registrations:
router.get("/", verifyToken, async (req, res) => {
  try {
    const allRegistrations = await Registration.find().sort({ createdAt: -1 });
    res.json(allRegistrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve registrations",
      error: error.message,
    });
  }
});

//! To delete a user:
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({
      message: "Failed to delete registration",
      error: error.message,
    });
  }
});

export default router;
