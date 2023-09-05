const InterestList = require('../../models/interestList');

module.exports = {
  create,
  show,
  addStock,
  delStock
};

async function create(req, res) {
  try {
    const interestList = await InterestList.create({user: req.user._id, stocks: []});
    res.json(interestList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const interestList = await InterestList.findOne({user: req.user._id}).populate("stocks");
    res.json(interestList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function addStock(req, res) {
  try {
    const interestList = await InterestList.findOne({user: req.user._id});
    if (!interestList) throw new Error('Not Found.');
    interestList.stocks.push(req.body)
    await interestList.save();
    await interestList.populate("stocks");
    res.json(interestList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}
  
async function delStock(req, res) {
  try {
    const interestList = await InterestList.findOne({user: req.user._id});
    if (!interestList) throw new Error();
    interestList.stocks = interestList.stocks.filter(stock => {
      return stock._id != req.body._id
    });
    res.json(await interestList.save());
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}
