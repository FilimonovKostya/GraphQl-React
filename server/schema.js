const {buildSchema} = require('graphql')

const schema = buildSchema(`
    
    type User {
        id: ID
        userName: String
        age: Int
        posts: [Post] 
    }
    type Post {
         id: ID
         title: String
         content: String
    }
    
        input UserInput {
        id: ID
        userName: String!
        age: String!
        posts: [PostInput] 
    }
    
    input PostInput {
           id: ID
           userName: String!
         content: String! 
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    
    type Mutation {
        createUser(input: UserInput) : User
    }
    
`)

module.exports = schema