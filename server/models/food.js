const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var foodSchema = new Schema({
  name: String,
  address: String,
  description: String,
  price: Number,
  phone: String,
  imageUrl: String,
  lat: String,
  lng: String
},{
  timestamps: true
})

var Food = mongoose.model('Food',foodSchema);

module.exports = Food
