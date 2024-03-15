const mongoose = require('mongoose');

const Items = mongoose.model('Items', {
  name: String,
  slug: String,
  brand: String,
  model: String,
  category: String,
  stock: Number,
  newStock: Number,
  serialNumber: Number,
  editing: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId"
  },
  created_at: {
    type: Date, default: Date.now
  },
});

module.exports = Items