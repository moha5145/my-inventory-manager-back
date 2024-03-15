const mongoose = require('mongoose');

const Categories = mongoose.model('Categories', {
  label: String,
  value: String,
  newCategory: String,
  editing: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId"
  },
  created_at: {
    type: Date, default: Date.now
  },
});


module.exports = Categories