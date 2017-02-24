const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var foodSchema = new Schema({
  name: String,
  address: String,
  category: String,
  price: Number,
  phone: String,
  imageUrl: String,
  rating:Number
},{
  timestamps: true
})

var Food = mongoose.model('Food',foodSchema);

module.exports = Food
