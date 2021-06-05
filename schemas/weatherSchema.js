const WeatherSchema = {
    types: `
     type Coordinates{
             lon: Float
             lat:Float
         }
         type Weather{
             id:Int!
             main:String
             description:String
             icon:String
         }
         type WeatherTemp{
             temp:Float
             feels_like:Float
         }
         type WeatherResponse{
             id:String!
             name:String
             base:String
             coord: Coordinates
             main: WeatherTemp
             weather: [Weather]!
         }
         `
    ,
    queries: `
         weatherCity(city: String!): WeatherResponse
         weatherCoords(lat: Float!, lon: Float!):WeatherResponse
         `
}
const WeatherResolvers = {
    Query: {
        weatherCity: (_, { city }, { dataSources }) => {
            return dataSources.weatherSource.getCity(city);
        },
        weatherCoords: (_, { lat, lon }, { dataSources }) => {
            return dataSources.weatherSource.getCoords(lat, lon);
        }
    },
    Mutation: {

    }
}
module.exports = {
    weatherSchema: WeatherSchema,
    weatherResolver: WeatherResolvers
};
