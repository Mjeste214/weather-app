const request = require("request");

var geocode = (adress,callback) => {
   var urlgeo  =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoibWplc3RlMjE0IiwiYSI6ImNraWhleWhuajBkZGIzMG9nd2dtYTdpZTcifQ.ZCGL5x__GWbCbPZiwySPnQ&limit=1';
   
   request({url: urlgeo , json:true}, (error,response) =>{
      if (error) {
         callback('İnternet Bağlantısı yok',undefined);
       }
       else if (response.body.features.length === 0) {
          callback('Lokasyon bulunamadı',undefined);
       }
       else {
          callback(undefined, {
             latitude: response.body.features[0].center[0],
             longitude : response.body.features[0].center[1],
             location : response.body.features[0].place_name
          });
       }
   });   
}

module.exports = geocode;
