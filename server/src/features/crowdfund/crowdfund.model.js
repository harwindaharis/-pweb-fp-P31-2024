const mongoose = require('mongoose');

const CrowdfundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  status: { type: String, enum: ['open', 'close'], default: 'open' },
});

module.exports = mongoose.model('Crowdfund', CrowdfundSchema);