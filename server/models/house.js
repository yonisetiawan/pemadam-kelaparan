const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var houseSchema = new Schema({
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

var House = mongoose.model('House',houseSchema);

module.exports = House
