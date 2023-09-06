const Stock = require('../../models/stock');

module.exports = {
  create,
  show,
};

async function create(req, res) {
  try {
    const stock = await Stock.create(req.body);
    res.json(stock);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const stock = await Stock.findOne({symbol: req.params.id});
    res.json(stock);
  } catch (err) {
    res.status(400).json(err);
  }
}
