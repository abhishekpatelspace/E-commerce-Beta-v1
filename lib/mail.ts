import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  const mailOptions = {
    from: `"CraftOre Security" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your CraftOre Verification Code",
    text: `Your CraftOre verification code is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c5a880; font-family: serif; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Verify Your CraftOre Account</h2>
        <p>Thank you for signing up with CraftOre. Please enter the following 6-digit verification code to complete your registration:</p>
        <div style="background-color: #f9f6f0; border: 1px solid #e5dfd5; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 6px; text-align: center; margin: 25px 0; color: #1a1a1a; border-radius: 4px;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  };
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`✔ Verification email sent successfully to ${email}`);
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }
}

export async function sendWelcomeCredentialsEmail(email: string, name: string, passwordString: string) {
  const mailOptions = {
    from: `"CraftOre Support" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to CraftOre - Your Account Details",
    text: `Hello ${name},\n\nYour account has been created successfully!\n\nHere are your login credentials:\nEmail: ${email}\nPassword: ${passwordString}\n\nPlease use these credentials to sign in.\n\nBest regards,\nCraftOre Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c5a880; font-family: serif; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Welcome to CraftOre</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your account has been successfully registered on our premium sustainable lifestyle store. Here are your account login details:</p>
        <div style="background-color: #f9f6f0; border: 1px solid #e5dfd5; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 5px 0;"><strong>Login Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${passwordString}</p>
        </div>
        <p>Please keep these credentials secure. You can log in using these details or the password you specified during registration.</p>
        <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
          Best regards,<br/>
          <strong>The CraftOre Team</strong>
        </p>
      </div>
    `,
  };
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`✔ Welcome credentials email sent successfully to ${email}`);
  } catch (err) {
    console.error("Failed to send welcome credentials email:", err);
  }
}
