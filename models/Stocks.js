const mongoose = require('mongoose');

const Stocks = mongoose.model('Stocks', {
  name: String,
  stock: Number,
  category: String,
  editing: Boolean,
  purchaseDate: String,
  purchasePrice: Number,
  salePrice: Number,
  stockType: String,
  supplier: String,
  note: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId"
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemId"
  },
  created_at: {
    type: Date, default: Date.now
  },
  updated_at: {
    type: Date, default: Date.now
  },
});


module.exports = Stocks