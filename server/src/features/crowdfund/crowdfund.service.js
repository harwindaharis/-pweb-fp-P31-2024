const Crowdfund = require("./crowdfund.model");

module.exports = {
  getAllCrowdfunds: () => Crowdfund.find(),
  getCrowdfundById: (id) => Crowdfund.findById(id),
  createCrowdfund: (data) => new Crowdfund(data).save(),
  updateCrowdfund: (id, data) => Crowdfund.findByIdAndUpdate(id, data, { new: true }),
  deleteCrowdfund: (id) => Crowdfund.findByIdAndDelete(id),
};