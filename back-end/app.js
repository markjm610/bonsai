const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


// const uri = process.env.ATLAS_URI;
const uri = 'mongodb+srv://treeUser:tree@Cluster0.rbi8l.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB')
})


const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {
    console.log('listening on 4000')
})