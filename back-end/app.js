const express = require('express')
const graphQLHTTP = require('express-graphql')

const app = express()

app.use('/graphql', graphqlHTTP({

}))


app.listen(4000, () => {
    console.log('listening on 4000')
})