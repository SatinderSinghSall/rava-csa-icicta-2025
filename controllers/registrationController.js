const { sendConfirmationEmail } = require("../services/emailService");

const registerUser = async (req, res) => {
  const { fullName, email, phone, category, institution, country } = req.body;

  // Here you can handle the user registration logic (e.g., saving to the database)
  // For now, we'll just mock it and assume registration is always successful

  try {
    // Send the confirmation email
    await sendConfirmationEmail(email, fullName);

    res
      .status(200)
      .send({ message: "Registration successful, confirmation email sent." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error during registration: " + err.message });
  }
};

module.exports = { registerUser };
