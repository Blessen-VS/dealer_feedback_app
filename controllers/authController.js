// pzeu csbw okia neqt

const { auth } = require('../firebaseConfig'); // Firebase Admin SDK
const User = require('../models/User'); // MongoDB User model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // For sending email

// Set up a mail transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use Gmail or your preferred service
  auth: {
    user: 'blessenvs1998@gmail.com', // Your email address
    pass: 'pzeucsbwokianeqt', // Your email password or app password
  },
});

exports.register = async (req, res) => {
  const { email, firstName, lastName, contactNumber, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user in MongoDB
    const newUser = new User({
      email,
      firstName,
      lastName,
      contactNumber,
      password,
      isVerified: false,
    });
    await newUser.save();

    // Create a new user in Firebase
    const firebaseUser = await auth.createUser({
      email,
      emailVerified: false, // Mark as not verified initially
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Generate an email verification link
    const verificationLink = await auth.generateEmailVerificationLink(email);

    // Send the verification link via email
    await transporter.sendMail({
      from: '"Feedback-App" <blessenvs1998@gmail.com>', // Sender info
      to: email, // User's email
      subject: 'Verify Your Email',
      html: `<p>Hi ${firstName},</p>
             <p>Thank you for registering with Feedback-App version 1. Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>
             <p>If you did not register, please ignore this email.</p>`,
    });

    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.checkVerificationStatus = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check Firebase for the email verification status
    const firebaseUser = await auth.getUserByEmail(email);
    if (firebaseUser.emailVerified) {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ isVerified: true });
    }

    res.status(200).json({ isVerified: false });
  } catch (error) {
    console.error('Error checking verification status:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
