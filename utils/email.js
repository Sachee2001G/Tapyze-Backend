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


export { sendEmail };
