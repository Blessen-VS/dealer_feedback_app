// models/Consumer.js
const mongoose = require('mongoose');

const ConsumerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  rating: { type: Number, required: true },
  documentPath: { type: String }, // Path to the uploaded file
}, { timestamps: true });

const Consumer = mongoose.model('Consumer', ConsumerSchema);

module.exports = Consumer;
