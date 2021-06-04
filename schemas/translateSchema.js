 const  TranslateSchema={
     types:`
    
     type Translation{
         translatedText: String!
             
         }
         type TranslateResponse{
             translations:[Translation]
         }
         `
         ,
         queries:`
         translate(text: String!,from:String!,to:String!): TranslateResponse
         
         `
}
 const TranslateResolvers={
    Query:{
        translate:(_,{text,from,to},{dataSources})=>{
             return dataSources.translateSource.translate(text,from,to);
        },
       
    },
    mutation:{

    }
}
module.exports={
    translateSchema:TranslateSchema,
    translateResolver: TranslateResolvers
};
