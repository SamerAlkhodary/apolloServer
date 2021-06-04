const dataSources= require('./dataSources');
const schemas = require('./schemas');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`

  ${schemas.weather.weatherSchema.types}
  ${schemas.translate.translateSchema.types}

  type Query {

    ${schemas.weather.weatherSchema.queries}
    ${schemas.translate.translateSchema.queries}

  }

`;

const resolvers={

  Query:
    Object.assign(
      schemas.weather.weatherResolver.Query,
      schemas.translate.translateResolver.Query)
  


}
const server = new ApolloServer({ typeDefs,resolvers, dataSources});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  }); 