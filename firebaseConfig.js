const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ACCOUNT.replace(/\\n/g, '\n'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


module.exports = {
  admin, // Export admin for further usage if needed
  auth: admin.auth(), // Explicitly export the `auth` service
};
