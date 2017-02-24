var express = require('express');
var router = express.Router();
var modelsHouse = require('../models/house')

/* GET home page. */
router.get('/getAll', function(req, res, next) {
    modelsHouse.find({},function(err, result) {
       if(err)res.send(err)
       else res.send(result)
    })
});

router.post('/add', function(req, res, next) {
  var addHouse = new modelsHouse({
    name: req.body.inputHouse.name,
    address: req.body.inputHouse.address,
    description: req.body.inputHouse.description,
    price: req.body.inputHouse.price,
    phone: req.body.inputHouse.phone,
    imageUrl: req.body.inputHouse.imageUrl,
    lat: req.body.inputHouse.lat,
    lng: req.body.inputHouse.lng
  })
  addHouse.save(function(err, result) {
    if(err)res.send(err)
    else res.send(result)
  })
});

router.delete('/delete',function(req, res, next) {
  modelsHouse.findByIdAndRemove(req.body.id, function(result) {
      res.send(req.body.id)
  })
})

router.post('/detail',function(req, res, next) {
  modelsHouse.findById(req.body.id, function(err, result) {
      res.send(result)
  })
})

module.exports = router;
