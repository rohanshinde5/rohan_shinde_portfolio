import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, email and message.',
    });
  }

  try {
    console.log('================ CONTACT REQUEST ================');
    console.log('Incoming Data:', req.body);

    // Debug environment variables
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'FOUND' : 'NOT FOUND');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'FOUND' : 'NOT FOUND');
    console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'FOUND' : 'NOT FOUND');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');

    // -----------------------------
    // Save to MongoDB
    // -----------------------------
    const newContact = new Contact({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    const savedContact = await newContact.save();

    console.log('✅ Contact saved to MongoDB');

    // -----------------------------
    // Send Email
    // -----------------------------
    let emailSent = false;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Verify SMTP connection
      await transporter.verify();
      console.log('✅ SMTP connection verified');

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `Portfolio Inquiry: ${subject || 'New Message'}`,
        text: `
Name: ${name}

Email: ${email}

Subject: ${subject || 'General Inquiry'}

Message:
${message}
`,
        html: `
<h2>New Portfolio Contact</h2>

<p><b>Name:</b> ${name}</p>

<p><b>Email:</b> ${email}</p>

<p><b>Subject:</b> ${subject || 'General Inquiry'}</p>

<p><b>Message:</b></p>

<p>${message}</p>
`,
      });

      emailSent = true;

      console.log('✅ Email sent successfully');
    } catch (emailError) {
      console.error('❌ Email Error');
      console.error(emailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Message submitted successfully.',
      emailSent,
      data: savedContact,
    });
  } catch (error) {
    console.error('==========================================');
    console.error('❌ COMPLETE SERVER ERROR');
    console.error(error);
    console.error('==========================================');

    return res.status(500).json({
      success: false,
      error: error.message,
      name: error.name,
      stack:
        process.env.NODE_ENV === 'development'
          ? error.stack
          : 'Check server logs',
    });
  }
});

export default router;
