const MixSchema = {
    types: `
    
     type MixResponse{
         temp: Float
         name: String
         translation:String
             
         }
         
         `
    ,
    queries: `
         mixData(id: Int!,text:String!,to:String!,from:String!,city:String!): MixResponse
         
         `
}
const MixResolvers = {
    Query: {
        mixData: async(_, { id,text, from, to,city }, { dataSources,header }) => {
            const translation= await dataSources.translateSource.translate(text, from, to);
            const weather = await dataSources.weatherSource.getCity(city);
            const user = await dataSources.userSource.getUser(id);
            return {
                translation:translation.translations[0].translatedText,
                name: user?.users[0].name,
                temp: weather?.main.temp,
            }
        },

    },
    Mutation: {

    }
}
module.exports = {
    mixSchema: MixSchema,
    mixResolver: MixResolvers
};
