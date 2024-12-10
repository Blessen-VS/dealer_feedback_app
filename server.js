const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const consumerController = require('./controllers/consumerController');
const { check } = require('express-validator');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://blessenvs1998:root123@dealerfeedbackdb.04qod.mongodb.net/dealer_feedback_app?retryWrites=true&w=majority&appName=dealerfeedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/api/auth/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], authController.register);

app.get('/api/auth/check-verification-status', authController.checkVerificationStatus);
app.post('/api/create-consumer', consumerController.uploadMiddleware, consumerController.createConsumer);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
