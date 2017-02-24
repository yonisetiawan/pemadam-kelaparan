var express = require('express');
var router = express.Router();
var modelsFood = require('../models/food')

/* GET home page. */
router.get('/getAll', function(req, res, next) {
    modelsFood.find({},function(err, result) {
       if(err)res.send(err)
       else res.send(result)
    })
});

router.post('/add', function(req, res, next) {
  var addFood = new modelsFood({
    name: req.body.name,
    address: req.body.address,
    category: req.body.category,
    price: req.body.price,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    rating: req.body.rating
    // name: req.body.inputFood.name,
    // address: req.body.inputFood.address,
    // category: req.body.inputFood.category,
    // price: req.body.inputFood.price,
    // phone: req.body.inputFood.phone,
    // imageUrl: req.body.inputFood.imageUrl,
    // rating: req.body.inputFood.rating
  })
  addFood.save(function(err, result) {
    if(err)res.send(err)
    else res.send(result)
  })
});

router.delete('/delete',function(req, res, next) {
  modelsFood.findByIdAndRemove(req.body.id, function(result) {
      res.send(req.body.id)
  })
})

router.post('/detail',function(req, res, next) {
  modelsFood.findById(req.body.id, function(err, result) {
      res.send(result)
  })
})

module.exports = router;
