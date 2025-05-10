import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satindersinghsall2003@gmail.com",
    pass: "lneo wgao shgl uocy",
  },
});

export default transporter;
