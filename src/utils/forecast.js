const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=43843c1b297b7df21b9c2b26c6a749bb&query='+lat+','+long+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,
                (body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out. The local time is "+body.location.localtime+".")
            )
        }
    })
}

module.exports=forecast