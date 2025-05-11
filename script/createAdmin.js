import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await Admin.findOne({
      email: "satindersinghsall111@gmail.com",
    });
    if (existing) {
      console.log("Admin already exists");
    } else {
      const newAdmin = new Admin({
        email: "satindersinghsall111@gmail.com",
        password: "Satinder_Admin@123",
      });
      await newAdmin.save();
      console.log("Admin created successfully");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin:", error);
    mongoose.connection.close();
  }
};

createAdmin();
