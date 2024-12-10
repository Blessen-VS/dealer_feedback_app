const admin = require('firebase-admin');

// Function to send OTP
async function sendOtp(phoneNumber) {
  try {
    // Firebase Admin SDK does not support sending OTPs directly.
    // OTP sending and phone number verification is done on the client-side
    // using Firebase Authentication SDK (e.g., in your Flutter app).
    const verificationId = await admin.auth().generateSignInWithPhoneNumber(phoneNumber);
    return verificationId; // This verificationId is used on the client to receive OTP
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Error sending OTP');
  }
}

// Function to verify OTP (after client-side submission)
async function verifyOtp(verificationId, otp) {
  try {
    // Firebase Admin SDK does not support OTP verification directly.
    // OTP verification needs to be done on the client side via Firebase SDK.
    const result = await admin.auth().verifyPhoneNumber(verificationId, otp);
    return result; // Return the result or success status if OTP is valid
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw new Error('OTP verification failed');
  }
}

module.exports = { sendOtp, verifyOtp };
