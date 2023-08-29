const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  name:  {
    type: String,
    required: true
  },
  type: String,
  region: String,
  marketOpen: String,
  marketClose: String,
  timezone: String,
  currency: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);