const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Ensure correct path

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = {
  admin, // Export admin for further usage if needed
  auth: admin.auth(), // Explicitly export the `auth` service
};
