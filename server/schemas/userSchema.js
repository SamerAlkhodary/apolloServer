const UserSchema = {
    types: `
    
     type User{
         id: Int!
         name: String!
         age: Int!
             
         }
         type GetUsersResponse{
             users:[User]!
         }
         type AddUserResponse{
            status:String!
             id:Int!
         }
         `
    ,
    queries: `
         getUsers: GetUsersResponse
         getUser(id:Int!): GetUsersResponse
         `
    ,
    mutations: `
         addUser(id:Int!,name:String!,age:Int!): AddUserResponse
    `
}
const UserResolver = {
    Query: {
        getUsers: (_, {id}, { dataSources,header }) => {
            return dataSources.userSource.getUsers();
        },
        getUser: (_, { id }, { dataSources,header }) =>{
            return dataSources.userSource.getUser(id);
        }
    },
    Mutation: {
        addUser:(_,{id,name,age},{dataSources,header}) => {
            return dataSources.userSource.addUser({id, name, age});
        }
    }
}
module.exports = {
    schema: UserSchema,
    resolvers: UserResolver
};
