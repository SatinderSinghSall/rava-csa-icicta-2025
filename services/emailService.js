import transporter from "../config/nodemailerConfig.js";

export const sendConfirmationEmail = async (email, fullName) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Registration Confirmation</title>
        <style>
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              padding: 20px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f2f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f2f4f6; padding: 40px 0;">
          <tr>
            <td align="center">
              <table class="email-container" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <tr>
                  <td style="padding: 30px 40px; text-align: center; background-color: #0073e6;">
                    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Welcome to REVA: CSA ICICTA 2025</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; color: #333333;">
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${fullName}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.6;">
                      Thank you for registering with us! We’re thrilled to have you on board.
                      Stay tuned for updates and exciting news about our platform.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6;">
                      If you have any questions, feel free to contact us anytime.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                      <a href="https://reva-csa-icicta-2025.vercel.app/" style="background-color: #0073e6; color: #ffffff; padding: 14px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">Visit Our Website</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px; text-align: center; font-size: 12px; color: #999999; background-color: #f9f9f9;">
                    &copy; 2025 REVA: CSA ICICTA 2025. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
