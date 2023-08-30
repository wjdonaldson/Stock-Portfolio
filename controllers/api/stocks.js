const Stock = require('../../models/stock');

module.exports = {
  create,
  show,
};

async function create(req, res) {
  console.log('create()');
  try {
    const stock = await Stock.create(req.body);
    res.json(stock);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  console.log('show()');
  try {
    console.log(req.params.id);
    const stock = await InterestList.findOne({symbol: req.params.id});
    res.json(stock);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
