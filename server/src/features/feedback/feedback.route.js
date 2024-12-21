const Crowdfund = require('./crowdfund.model'); // Pastikan file model tersedia

module.exports = {
  getAllCrowdfunds: async () => await Crowdfund.find(),
  getCrowdfundById: async (id) => await Crowdfund.findById(id),
  createCrowdfund: async (data) => await new Crowdfund(data).save(),
  updateCrowdfund: async (id, data) => await Crowdfund.findByIdAndUpdate(id, data, { new: true }),
  deleteCrowdfund: async (id) => await Crowdfund.findByIdAndDelete(id),
};