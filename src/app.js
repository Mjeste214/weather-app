var path = require('path');
var express = require('express');
var hbs = require('hbs');
var  geocode = require('./utils/geocode')
var  forecast = require('./utils/weather')
var app = express();
var port = process.env.PORT || 3000;

var publicPath = path.join(__dirname,'../public')
var viewsPath = path.join(__dirname, '../templates/views')
var partialPath =  path.join(__dirname, '../templates/partial')


app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


app.use(express.static(publicPath))




app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'OFS'
    });
});

app.get('/help',(req,res) => {
    res.render('help');
});

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/weather',(req,res) => {
    if(!req.query.adress) {
        return res.send({
            error: 'Adres tanımlaman gerek'
        })
    }

    geocode(req.query.adress,(error, { latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude,(error,forecastData) => {

                if (error) {
                    return res.send({error})
                }


                return res.send({
                    forecast : forecastData, location,
                    adress: req.query.adress
                });
            });
    });
});

app.get('/products',(req,res) => {
    res.res({
        products: []
    });
});


app.get('*',(req,res) => {
    res.render('404',{
        errorMessage : "sayfa bulunamadı 404"
    });
});

app.listen(port, ()=> {
    console.log('Server is up on port'+ port);
});