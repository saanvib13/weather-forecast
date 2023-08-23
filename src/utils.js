const request=require('postman-request')

const geocode=(loc,callback)=>{
    const geocodeUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=" + encodeURIComponent(loc) + "&f=json&token=AAPKfa057eb3957b45358c69877d0bb7cacbWdCc6UZMpnb7w6WoqzxSpcf6yTZzdDpyR5nA0pLWIuM-gxphZ7nIjaGQY4R0XNZK&maxLocations=1"
    request(
        {
            url:geocodeUrl,
            json:true
        },
        (err,response)=>{
            if(err){
                callback('unable to connect',undefined)
            }else if(response.body.candidates.length===0){
                callback('location not found')
            }else{
                callback(undefined,{
                    longitude: response.body.candidates[0].location.x,
                    latitude: response.body.candidates[0].location.y
                })
            }
        }
    )

}

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=19b0ba5f38c411da705b477b94e44d39&query="+latitude+","+longitude
    request(
        {
            url,
            json:true
        },
        (err,response)=>{
            if(err){
                callback('unable to connect',undefined)
            }
            else if(response.body.error){
                callback('enter correct coordinates',undefined)
            }
            else {
                console.log(response.body.location);
                callback(undefined,{
                    temp:response.body.current.temperature,
                    desc:response.body.current.weather_descriptions[0],
                    feelslike:response.body.current.feelslike,
                    name:response.body.location.name,
                    region:response.body.location.region,
                    country:response.body.location.country 
                })
            }
        }
    )
}

module.exports={
    geocode:geocode,
    forecast:forecast
}