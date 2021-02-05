const request = require('request')

const forecast = (lat, long, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=9e0c1f7c2b1c6e6b23350a24bfb74f91&query=' + lat + ',' + long + '&units=f'
    request({url, json: true }, (error, { body } = {}) =>{
        if (error) {
                    callback('Unable to connect to weather service')
             } 
                else if (body.error){
                    callback('Unable to find location.')
                }
                else{
                    
            
            
                 callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +  body.current.temperature +
                ' degress out. There is a ' + body.current.precip + '% chance of rain.')
                }
    })
}

module.exports = forecast   