
var app = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to Pemadam Kelaparan',
    food: [],
    randomfood: [],
    detailFood: [],
    inputFood: {
      name: '',
      address: '',
      category: '',
      price: '',
      phone: '',
      imageUrl: '',
      youtubeUrl: '',
      rating: '',
    },
    editFood: {
      _id: '',
      name: '',
      address: '',
      category: '',
      price: '',
      phone: '',
      imageUrl: '',
      youtubeUrl: '',
      rating: ''
    }
  },
  methods: {
    getAllFood: function () {
      axios.get('http://localhost:3000/food/getAll')
        .then(function (result) {
          app.food = result.data.reverse()
          app.pushFoodRandom(result.data.length)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    pushFoodRandom: function(input) {
        if(input==0){
          var acak = Math.floor(Math.random()*1)
        }else if(input < 5){
          var acak = Math.floor(Math.random()*1)
          app.randomfood.push(app.food[acak])
        }else{
          for (var i = 0; i < 4; i++) {
            var acak = Math.floor(Math.random()*input)
            app.randomfood.push(app.food[acak])
          }
        }
    },
    createOneFood: function () {
      axios.post('http://localhost:3000/food/add', {
        inputFood: app.inputFood,
      })
        .then(function (result) {
          app.food.unshift(result.data)
          app.inputFood.name = ''
          app.inputFood.address = ''
          app.inputFood.category = ''
          app.inputFood.price = ''
          app.inputFood.phone =  ''
          app.inputFood.imageUrl = ''
          app.inputFood.imageUrl = ''
          app.inputFood.rating = ''
        })
        .catch(function (error) {
          console.log(error)
        })
        app.getAllFood()
    },
    deleteOneFood: function (inputid) {

      axios({
          method: 'delete',
          url: 'http://localhost:3000/food/delete',
          data: {
              id: inputid
          }
      }).then(function(result) {
          for (var i = 0; i < app.food.length; i++) {
              if (app.food[i]._id == result.data) {
                  app.food.splice(i, 1)
              }
          }
      }).catch(function(error) {
          console.log(error)
      })
    },
    showDetailFood: function (inputid) {
      document.getElementById("listView").innerHTML = ""

      axios.post('http://localhost:3000/food/detail', {
        id: inputid,
      })
        .then(function (result) {
          var detailData = `
              <div class="ui grid">
                  <div class="two column row">
                      <div class="boxFood">
                          <img src="${result.data.imageUrl}" alt="">
                      </div>
                      <div id="mapdetails" class="boxMaps">
                      </div>
                  </div>
                  <div class="detailData">
                  <h1>${result.data.name}</h1>
                  <p>${result.data.address}</p>
                  <p>${result.data.description}</p>
                  <h3>Rp. ${result.data.price}</h3>
                  <h4>Telp. ${result.data.phone}}</h4>
                  </div>
              </div>`

          $("#listView").append(detailData)
          pinMaps(result.data.lat, result.data.lng)

        })
        .catch(function (error) {
          console.log(error)
        })

    }

  }
})

app.getAllFood()
function createIklan() {
    $('.small.modal')
        .modal('show');
}

//
// function pinMaps(latInput, lngInput) {
//       map = new GMaps({
//           div: '#mapdetails',
//           zoom: 16,
//           lat: latInput,
//           lng: lngInput,
//       })
//       map.addMarker({
//         lat: latInput,
//         lng: lngInput,
//       });
// }
// function getLocation() {
//   map = new GMaps({
//       div: '#mapsGetLocation',
//       zoom: 16,
//       lat: -6.260772,
//       lng: 106.781638,
//       click: function(e) {
//         map.removeMarkers()
//         app.inputFood.lat = e.latLng.lat()
//         app.inputFood.lng = e.latLng.lng()
//         map.addMarker({
//           lat: e.latLng.lat(),
//           lng: e.latLng.lng(),
//         });
//       }
//   });
// }
