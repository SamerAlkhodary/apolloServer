const TranslateSchema = {
    types: `
    
     type Translation{
         translatedText: String!
             
         }
         type TranslateResponse{
             translations:[Translation]
         }
         `
    ,
    queries: `
         translate(text: String!,from:String!,to:String!): TranslateResponse
         
         `
}
const TranslateResolvers = {
    Query: {
        translate: (_, { text, from, to }, { dataSources,header }) => {
            console.log(header);
            return dataSources.translateSource.translate(text, from, to);
        },

    },
    Mutation: {

    }
}
module.exports = {
    schema: TranslateSchema,
    resolvers: TranslateResolvers
};
