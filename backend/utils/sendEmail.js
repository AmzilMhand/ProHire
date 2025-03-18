const nodemailer = require('nodemailer');
const config = require('../config/config');

/**
 * Send email using nodemailer with Ethereal (fake emails for development)
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @returns {Promise} - Email sending result
 */
const sendEmail = async (options) => {
  // Create test account for development
  const testAccount = await nodemailer.createTestAccount();

  // Create transporter with ethereal email (fake emails for testing)
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  // Define mail options
  const mailOptions = {
    from: `ProHire <${testAccount.user}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log(`Email sent: ${info.messageId}`);
  
  // Log URL where you can preview the email (Ethereal feature)
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  
  return info;
};

module.exports = sendEmail;