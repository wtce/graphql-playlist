// setting up server
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB Atlas db
mongoose.connect('mongodb+srv://edoan:test123@graphql-uh5bg.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
 console.log('Connected to database');
});


app.use('/graphql', graphqlHTTP({
    //describes schema for graph
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
});
