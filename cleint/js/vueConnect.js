
var app = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to HousePedia',
    houses: [],
    detailHouse: [],
    inputHouse: {
      name: '',
      address: '',
      description: '',
      price: '',
      phone: '',
      imageUrl: '',
      lat: '',
      lng: ''
    },
    editHouse: {
      _id: '',
      name: '',
      address: '',
      description: '',
      price: '',
      phone: '',
      imageUrl: '',
      lat: '',
      lng: ''
    }
  },
  methods: {
    getAllHouses: function () {
      axios.get('http://localhost:3000/api/getAll')
        .then(function (result) {
          app.houses = result.data.reverse()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createOneHouse: function () {
      axios.post('http://localhost:3000/api/add', {
        inputHouse: app.inputHouse,
      })
        .then(function (result) {
          app.houses.unshift(result.data)
          app.inputHouse.name = ''
          app.inputHouse.address = ''
          app.inputHouse.description = ''
          app.inputHouse.price = ''
          app.inputHouse.phone =  ''
          app.inputHouse.imageUrl = ''
          app.inputHouse.lat = ''
          app.inputHouse.lng = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteOneHouse: function (inputid) {

      axios({
          method: 'delete',
          url: 'http://localhost:3000/api/delete',
          data: {
              id: inputid
          }
      }).then(function(result) {
          for (var i = 0; i < app.houses.length; i++) {
              if (app.houses[i]._id == result.data) {
                  app.houses.splice(i, 1)
              }
          }
      }).catch(function(error) {
          console.log(error)
      })
    },
    showDetailHouse: function (inputid) {
      document.getElementById("listView").innerHTML = ""

      axios.post('http://localhost:3000/api/detail', {
        id: inputid,
      })
        .then(function (result) {
          var detailData = `
              <div class="ui grid">
                  <div class="two column row">
                      <div class="boxHouse">
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

app.getAllHouses()

function pinMaps(latInput, lngInput) {
      map = new GMaps({
          div: '#mapdetails',
          zoom: 16,
          lat: latInput,
          lng: lngInput,
      })
      map.addMarker({
        lat: latInput,
        lng: lngInput,
      });
}
function createIklan() {
    $('.small.modal')
        .modal('show');
}
function getLocation() {
  map = new GMaps({
      div: '#mapsGetLocation',
      zoom: 16,
      lat: -6.260772,
      lng: 106.781638,
      click: function(e) {
        map.removeMarkers()
        app.inputHouse.lat = e.latLng.lat()
        app.inputHouse.lng = e.latLng.lng()
        map.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }
  });
}
