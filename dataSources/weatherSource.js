const  {RESTDataSource} =require('apollo-datasource-rest');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/'
 class WeatherAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL=API_URL;
    }
    willSendRequest(request){

        request.params.set('appid',API_KEY);
        request.params.set('units','metric');

    }
    async getCity(city){
        const result = await this.get('weather',{q:city});
        return result;
    }
    async getCoords(lat, lon){
        const result = await this.get('weather',{lat,lon});
        return result;
    }


}
module.exports= WeatherAPI;