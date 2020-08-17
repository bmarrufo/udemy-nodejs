const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app =  express();

//Define paths for Express configuration
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bernardo Marrufo'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bernardo Marrufo'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bernardo Marrufo',
        message: 'Keep going!'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, placeName: placename } = { }) => {
        if(error)
            return res.send({ error });
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({ error });

            res.send({
                location: placename,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bernardo Marrufo',
        message: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bernardo Marrufo',
        message: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})