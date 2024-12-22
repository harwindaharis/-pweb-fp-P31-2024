const mongoose = require('mongoose');

const CrowdfundSchema = new mongoose.Schema({
	name: { type: String, required: true },
	target: { type: Number, required: true },
	status: { type: String, enum: ["open", "close"], default: "open" },
	favorite: { type: Boolean, default: false },
	comments: [
		{
			user: { type: String },
			message: { type: String, required: true },
			createdAt: { type: Date, default: Date.now },
		},
	],
});

module.exports = mongoose.model('Crowdfund', CrowdfundSchema);
