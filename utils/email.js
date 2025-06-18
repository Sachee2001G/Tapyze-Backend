import nodemailer from 'nodemailer';




const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      secure: false,
      requireTLS: true,
      logger: true,
      debug: true
    });
      // Prepare email content based on template type
    let emailContent;
    
    if (options.template === 'passwordReset') {
      emailContent = emailTemplates.passwordReset(options.name, options.code);
    } else if (options.template === 'merchantPasswordReset') {
      emailContent = emailTemplates.merchantPasswordReset(options.ownerName, options.businessName, options.code);
    } else {
      // Fallback to custom or generic template
      emailContent = {
        subject: options.subject || 'Notification from Tapyze',
        text: options.message,
        html: options.html || emailTemplates.generic(options.message).html
      };
    }


export { sendEmail };
