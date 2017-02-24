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
    name: req.body.inputFood.name,
    address: req.body.inputFood.address,
    description: req.body.inputFood.description,
    price: req.body.inputFood.price,
    phone: req.body.inputFood.phone,
    imageUrl: req.body.inputFood.imageUrl,
    lat: req.body.inputFood.lat,
    lng: req.body.inputFood.lng
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
