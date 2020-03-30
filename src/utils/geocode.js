const request = require('request')

const geocode=(address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2V0b3hkZXYiLCJhIjoiY2s4N2J1d2JwMGY3dzNsbXh4NjJvZnBqYyJ9.wL27GW-yGV5x0v8rPF0ssg'

    request(
        { url, json: true },
        (error,response)=>{
        if(error)
        {
            callback('No network. Unable to connect to location service!',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('Unable to find location. Try another search.',undefined)
        }
        else
        {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode