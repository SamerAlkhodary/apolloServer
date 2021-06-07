const { RESTDataSource } = require('apollo-datasource-rest');
const users=
    [
        {
            id:1,
            name: "Samer",
            age:28

        },
        {
            id:2,
            name: "Saga",
            age:24

        }
    ]
;
class UserSource extends RESTDataSource {
    constructor() {
        super();
    }
    
    async addUser(user) {
        users.push(user);
        return {
            status:"added",
            id: user.id
        };
    }
    async getUser(id) {
        const result = users.find(user=>user.id === id);
        return {users:[result]};
    }
    async getUsers() {
        return {users};
    }

}
module.exports = UserSource;