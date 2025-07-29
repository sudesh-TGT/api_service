const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true },
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  usageCount: { type: Number, default: 0 },
  limit: { type: Number, default: 1000 } // Based on plan
});

module.exports = mongoose.model('Client', ClientSchema);
