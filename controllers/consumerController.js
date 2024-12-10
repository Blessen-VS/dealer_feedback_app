// controllers/consumerController.js
const Consumer = require('../models/Consumer');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single('document'); // Middleware for handling file uploads

exports.createConsumer = async (req, res) => {
    const { name, email, contactNumber, addressLine1, city, pincode, rating, document } = req.body;
  
    try {
      let filePath = null;
  
      if (document) {
        const base64Data = document.replace(/^data:.*;base64,/, ''); // Remove base64 metadata
        const fileName = `uploads/${Date.now()}-document.pdf`; // Save as PDF or other file type
        fs.writeFileSync(fileName, base64Data, { encoding: 'base64' });
        filePath = fileName;
      }
  
      const consumer = new Consumer({
        name,
        email,
        contactNumber,
        address: {
          line1: addressLine1,
          city,
          pincode,
        },
        rating: Number(rating),
        documentPath: filePath, // Save file path in the database
      });
  
      await consumer.save();
      res.status(201).json({ message: 'Consumer created successfully', consumer });
    } catch (error) {
      console.error('Error creating consumer:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
