const request= require('request')

const forecast=(latitude,longitude,callback)=>{
    const url= 'https://api.darksky.net/forecast/9f31b59403783293ae4b4ad72b1304dc/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    
    request(
            {url, json: true},
            (error, {body})=>{
                if(error)
                {
                    callback('Unable to connect to weather service!',undefined)
                }
                else if(body.error)
                {
                    callback('Unable to find weather of location.',undefined)
                }
                else
                {
                    callback(undefined,body.daily.data[0].summary + ' It is currently ' +
                    body.currently.temperature + ' degrees out. The maximum temperature today is ' + body.daily.data[0].temperatureHigh + 
                    ' with a minimum temperature of ' + body.daily.data[0].temperatureLow +
                    '. There is ' + body.currently.precipProbability + '% chance of rain.')
                }
            })
}

module.exports= forecast