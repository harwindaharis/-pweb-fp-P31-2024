const express = require("express");
const router = express.Router();

const feedbackRoute = require("./feedback/feedback.route");
const authRoute = require("./auth/auth.route");
const crowdfundRoute = require('./crowdfund/crowdfund.route');

router.use("/feedback", feedbackRoute);
router.use("/auth", authRoute);
router.use("/crowdfund", crowdfundRoute);

router.get('/test', (req, res) => {
    res.json({ message: "API is working!" });
});

module.exports = router;