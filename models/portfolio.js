const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  stock:{
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  buyDate: {
    type : Date,
    default: Date.now,
    required: true
  },
  sellPrice: {
    type: Number,
  },
  SellDate: {
    type : Date,
  }
}, {
  timestamps: true
});

const portfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  purchases: [purchaseSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Purchase', purchaseSchema);
module.exports = mongoose.model('Portfolio', portfolioSchema);
