import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: false,
      requireTLS: true,
      logger: true,
      debug: true,
    });
    // Prepare email content based on template type
    let emailContent;

    if (options.template === "passwordReset") {
      emailContent = emailTemplates.passwordReset(options.name, options.code);
    } else if (options.template === "merchantPasswordReset") {
      emailContent = emailTemplates.merchantPasswordReset(
        options.ownerName,
        options.businessName,
        options.code
      );
    } else {
      // Fallback to custom or generic template
      emailContent = {
        subject: options.subject || "Notification from Tapyze",
        text: options.message,
        html: options.html || emailTemplates.generic(options.message).html,
      };
    }
    // Define the email options
    const mailOptions = {
      from: `Tapyze App <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    };

    // Verify connection and send email
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

export { sendEmail };
