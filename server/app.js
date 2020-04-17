// setting up server
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

const app = express();

//allow cross-origin requests
app.use(cors());

// connect to MongoDB Atlas db
mongoose.connect(MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
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
