require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');


let serviceAccount;

  serviceAccount = require('./firebase-service-account.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


module.exports = {
  admin, // Export admin for further usage if needed
  auth: admin.auth(), // Explicitly export the `auth` service
};
