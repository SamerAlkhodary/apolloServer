const dataSources = require('./dataSources');
const schemas = require('./schemas');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`

  ${schemas.weather.weatherSchema.types}
  ${schemas.translate.translateSchema.types}
  ${schemas.user.userSchema.types}

  type Query {

    ${schemas.weather.weatherSchema.queries}
    ${schemas.translate.translateSchema.queries}
    ${schemas.user.userSchema.queries}

  }
  type Mutation {

    ${schemas.user.userSchema.mutations}

  }
`;
const context=({req})=>{ return {header:req.headers}};

const resolvers = {
  Query:
    Object.assign(
      schemas.weather.weatherResolver.Query,
      schemas.translate.translateResolver.Query,
      schemas.user.userResolver.Query
    ),
  Mutation: 
  Object.assign(
    schemas.user.userResolver.Mutation
  )
}
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources,
  context
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});