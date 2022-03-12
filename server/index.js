const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const users = [{id: 1, userName: 'Kostya', age: 25}]

const app = express()
app.use(cors())

const createUser = (input) => {
    const id = Date.now()
    return {
        id,
        ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        console.log(id)
        console.log(users)
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(3001, (err) => {
    err ? console.log(err) : console.log('Server  started on 3001 port')
})