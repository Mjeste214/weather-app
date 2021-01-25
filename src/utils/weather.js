var request = require('request');

var weather = (latitude,longtitude,callback) => {
    var weatherurl = 'http://api.weatherstack.com/current?access_key=b8ba711b3f7ded1ed84046a2029b9bf0&query='+longtitude+','+latitude;


    request({url:weatherurl , json:true} , (error,response)=> {    
        if (error) {
            callback('servis yok!', undefined);    
        } 
        else if(response.body.error) {
            callback('lokasyon yok!',undefined);
        }
        else{

            callback(undefined,response.body.current);
        }
    });

}

module.exports = weather;