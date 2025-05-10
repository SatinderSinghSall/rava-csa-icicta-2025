import transporter from "../config/nodemailerConfig.js";

export const sendConfirmationEmail = async (email, fullName) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            color: #0073e6;
            margin-bottom: 20px;
          }
          .body-text {
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            background-color: #0073e6;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">Registration Successful</div>
          <div class="body-text">
            <p>Hello ${fullName},</p>
            <p>Thank you for registering with us! We are excited to have you on board.</p>
            <p>We will keep you updated with the latest information about our platform.</p>
            <p>If you have any questions, feel free to reach out to us anytime.</p>
            <a href="https://rava-csa-icicta-2025-4wn4.vercel.app/" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>&copy; 2025 REVA: CSA ICICTA 2025. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: "satindersinghsall2003@gmail.com",
    to: email,
    subject: "🎉 Registration Confirmation",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Error sending email: " + err.message);
  }
};
