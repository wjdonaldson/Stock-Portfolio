const InterestList = require('../../models/interestList');

module.exports = {
  create,
  show,
  addStock,
  delStock
};

async function create(req, res) {
  try {
    // we don't want to allow 2 interst lists for a user, so check if there is one already
    // and return that if there is
    let interestList = await InterestList.findOne({user: req.user._id}).populate("stocks");
    if (!interestList) {
      interestList = await InterestList.create({user: req.user._id, stocks: []});
    }
    res.json(interestList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    let interestList = await InterestList.findOne({user: req.user._id}).populate("stocks");
    if (!interestList) {
      interestList = await InterestList.create({user: req.user._id, stocks: []});
    }
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
    // look if it already exists
    if (!interestList.stocks.includes(req.body._id)) {
      interestList.stocks.push(req.body)
      await interestList.save();
    }
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
