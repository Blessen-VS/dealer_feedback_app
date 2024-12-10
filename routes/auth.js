const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { createConsumer, uploadMiddleware } = require('../controllers/consumerController');


// Register new user
router.post('/register', authController.register);

// Check email verification status
router.get('/check-verification-status', authController.checkVerificationStatus);

// Consumer routes
router.post('/create-consumer', uploadMiddleware, createConsumer);

module.exports = router;
