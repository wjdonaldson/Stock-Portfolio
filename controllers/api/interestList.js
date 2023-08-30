const InterestList = require('../../models/interestList');

module.exports = {
  create,
  show,
  addStock,
  delStock
};

async function create(req, res) {
  console.log('create()');
  try {
    const interestList = await InterestList.create({user: req.user._id, stocks: []});
    res.json(interestList);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  console.log('show()');
  try {
    console.log(req.user);
    const interestList = await InterestList.findOne({user: req.user._id}).populate("stocks");
    console.log(interestList.stocks);
    res.json(interestList);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function addStock(req, res) {
  console.log('addStock()');
  try {
    const interestList = await InterestList.findOne({user: req.user._id});
    console.log('-1-');
    console.log(interestList);
    console.log('-2-');
    if (!interestList) throw new Error('Not Found.');
    interestList.stocks.push(req.body)
    console.log(interestList);
    console.log('-3-');
    res.json(await interestList.save());
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
  
async function delStock(req, res) {
  console.log('delStock()');
  try {
    const interestList = await InterestList.findOne({user: req.user._id});
    if (!interestList) throw new Error();
    interestList.stocks = interestList.stocks.filter(stock => {
      console.log(`${stock._id} ${req.body._id} ${stock._id != req.body._id}`)
      return stock._id != req.body._id
    });
    console.log(interestList);
    res.json(await interestList.save());
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
