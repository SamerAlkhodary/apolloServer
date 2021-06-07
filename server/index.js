const dataSources = require('./dataSources');
const schemas = require('./schemas');
const { ApolloServer, gql } = require('apollo-server');
const plugins = require('./plugins');
const typeDefs = gql`

  ${schemas.weather.schema.types}
  ${schemas.translate.schema.types}
  ${schemas.user.schema.types}
  ${schemas.mix.schema.types}


  type Query {

    ${schemas.weather.schema.queries}
    ${schemas.translate.schema.queries}
    ${schemas.user.schema.queries}
    ${schemas.mix.schema.queries}
  }
  type Mutation {

    ${schemas.user.schema.mutations}

  }
`;
const context=({req})=>{ return {header:req.headers}};

const resolvers = {
  Query:
    Object.assign(
      schemas.weather.resolvers.Query,
      schemas.translate.resolvers.Query,
      schemas.user.resolvers.Query,
      schemas.mix.resolvers.Query,
    ),
  Mutation: 
  Object.assign(
    schemas.user.resolvers.Mutation
  )
}


const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources,
  context,
  plugins
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});