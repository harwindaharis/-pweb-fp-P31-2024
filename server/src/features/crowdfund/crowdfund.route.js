const express = require("express");
const router = express.Router();
const CrowdfundService = require("./crowdfund.service");

// Get all open crowdfunds
router.get("/", async (req, res) => {
	try {
		const crowdfunds = await CrowdfundService.getAllCrowdfunds();
		const openCrowdfunds = crowdfunds.filter((cf) => cf.status === "open");
		res.json(openCrowdfunds);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get crowdfund by ID
router.get("/:crowdfund_id", async (req, res) => {
	try {
		const crowdfund = await CrowdfundService.getCrowdfundById(req.params.crowdfund_id);
		if (!crowdfund) return res.status(404).json({ error: "Crowdfund not found" });
		res.json(crowdfund);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Add to favorite
router.post("/:crowdfund_id/favorite", async (req, res) => {
	try {
		const crowdfund = await CrowdfundService.updateCrowdfund(req.params.crowdfund_id, { favorite: true });
		if (!crowdfund) return res.status(404).json({ error: "Crowdfund not found" });
		res.json({ message: "Added to favorites", crowdfund });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Submit donation
router.post("/:crowdfund_id/donate", async (req, res) => {
	const { method, bankName, amount } = req.body;
	try {
		const crowdfund = await CrowdfundService.getCrowdfundById(req.params.crowdfund_id);
		if (!crowdfund) return res.status(404).json({ error: "Crowdfund not found" });

		const donation = {
			method,
			bankName: method === "Transfer" ? bankName : null,
			amount,
		};

		// Here you can save donations to a sub-document or another collection
		res.json({ message: "Donation successful", donation });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Submit comment
router.post("/:crowdfund_id/comment", async (req, res) => {
	const { message, user } = req.body;
	try {
		const crowdfund = await CrowdfundService.getCrowdfundById(req.params.crowdfund_id);
		if (!crowdfund) return res.status(404).json({ error: "Crowdfund not found" });

		// Save the comment (implementation depends on your database structure)
		const comment = { message, user }; // Example format
		res.json({ message: "Comment submitted", comment });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Success page
router.get("/:crowdfund_id/success", async (req, res) => {
	try {
		const crowdfund = await CrowdfundService.getCrowdfundById(req.params.crowdfund_id);
		if (!crowdfund) return res.status(404).json({ error: "Crowdfund not found" });

		res.json({
			message: "Thank you for your donation",
			crowdfund,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
