const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm1hcnJ1Zm8iLCJhIjoiY2tkdjdkZ2ViMXltMDJ3ano5dzhtY29oMSJ9.HQQ1B2drV5JSz-o30JxOxw&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if(error)
            callback('Unable to connect to location services!');

        else if(body.features.length === 0)
            callback('Unable to find location. Try another search.');
        
        else {
            const data = {
                placeName: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            }

            callback(undefined, data);
        }
    })
}

module.exports = geoCode;