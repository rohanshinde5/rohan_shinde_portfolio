import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields (name, email, message)' });
  }

  try {
    // 1. Save contact request to MongoDB
    const newContact = new Contact({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    const savedContact = await newContact.save();

    // 2. Try to send email via Nodemailer
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || 'rohansnshinde05@gmail.com';

    let emailSent = false;

    if (emailUser && emailPass) {
      try {
        // Create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Standard Gmail SMTP configuration, can be changed based on env
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        // Setup email data
        const mailOptions = {
          from: `"Portfolio Contact - Rohan Shinde" <${emailUser}>`,
          to: emailTo,
          replyTo: email,
          subject: `Portfolio Inquiry: ${subject || 'New Contact Request'}`,
          text: `You have received a new message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}
Message:
${message}

---
Sent automatically by Portfolio Server`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #7000ff; border-bottom: 2px solid #7000ff; padding-bottom: 10px;">New Portfolio Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #00f0ff;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="margin-top: 25px; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 11px; color: #888; text-align: center;">Sent automatically by Rohan Shinde's Portfolio Backend</p>
            </div>
          `,
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`[Email] Notification email successfully sent to ${emailTo}`);
      } catch (err) {
        console.error('[Email Error] Failed to send email via SMTP:', err.message);
        // We do not fail the request if the email sending failed, as we successfully saved to the database.
      }
    } else {
      console.log('[Email Info] Skipping email dispatch: EMAIL_USER and EMAIL_PASS are not defined in environmental variables.');
    }

    // Respond to frontend
    return res.status(201).json({
      success: true,
      message: 'Message saved successfully!',
      emailSent,
      data: savedContact,
    });
  } catch (error) {
    console.error('[Database Error] Failed to save contact request:', error);
    return res.status(500).json({ error: 'Server error: Failed to submit message' });
  }
});

export default router;
