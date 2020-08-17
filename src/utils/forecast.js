const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=35149f5cb71d0a03d764cf4acf592ee6&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Unable to connect to the weather service!');
        else if (body.error)
            callback('Unable to find location');
        else {
            const message = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out & the humidity is ' + body.current.humidity
            callback(undefined, message);
        }
    })
}

module.exports = forecast;