const express = require('express');
const router = express.Router();
const CrowdfundService = require('./crowdfund.service');

router.get('/', async (req, res) => {
  try {
    const crowdfunds = await CrowdfundService.getAllCrowdfunds();
    res.json(crowdfunds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const crowdfund = await CrowdfundService.createCrowdfund(req.body);
    res.status(201).json(crowdfund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;