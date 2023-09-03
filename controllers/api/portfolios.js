const Portfolio = require('../../models/portfolio');

module.exports = {
  create,
  show,
  addPurchase,
  updatePurchase
};

async function create(req, res) {
  try {
    const portfolio = await Portfolio.create({user: req.user._id, purchases: []});
    console.log(portfolio);
    res.json(portfolio);
  } catch (err) {
    res.status(400).json(err);
    console.error(err.message);
  }
}

async function show(req, res) {
  try {
    const portfolio = await Portfolio.findOne({user: req.user._id}).populate("purchases purchases.stock");
    console.log(portfolio);
    if (portfolio) {
      console.log("Got portfolio!");
      console.log(portfolio);
    } else {
      console.error("Couldn't get portfolio!");
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function addPurchase(req, res) {
  try {
    const portfolio = await Portfolio.findOne({user: req.user._id});
    // console.log('addPurchase() portfolio found:');
    // console.log(portfolio);
    if (!portfolio) throw new Error('Portfolio Not Found.');
    // console.log('addPurchase() purchase to add:');
    // console.log(req.body);
    portfolio.purchases.push(req.body);
    let newPortfolio = await portfolio.save();
    // console.log('addPurchase() retVal:');
    // console.log(retVal);
    await newPortfolio.populate("purchases.stock");
    res.json(newPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}
  
async function updatePurchase(req, res) {
  try {
    const portfolio = await Portfolio.findOne({user: req.user._id}).populate("purchases");
    if (!portfolio) {
      throw new Error('Portfolio Not Found.');
    }
    purchaseIdx = portfolio.purchases.findIndex(p => p._id == req.body._id);
    portfolio.purchases[purchaseIdx].set({...req.body});
    res.json(await portfolio.save());
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
}
