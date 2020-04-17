# Anime List using GraphQL in MERN Stack
Link to tutorial: https://bit.ly/2wMAE34

This application shows a list of animes and its respective information (studio, genre, etc.). You can also add animes to the database.

 ## Database
 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a non-sql database in the cloud.
 
 ## Server
 The server is written in Node.js and uses multiple libraries. 
 * [Mongoose](https://mongoosejs.com/) is used the ORM that creates schemas for MongoDB
 * [Express](https://expressjs.com/) is used as a simple framework to set up the server
 * [GraphQL Server](https://graphql.org/) is the query language used to create queries to the database
 
 ## Client
 
 The front-end is written in React and uses [Apollo](https://www.apollographql.com/) to translate GraphQL queries from the front-end to the server.
 
 # How to Start the Application
 Clone the repo and navigate inside. 
 ```$xslt
// Navigate to the server directory
$ cd server/

// Install dependencies
$ npm i

// Export your MongoDB connection string
$ export MONGO_CONNECTION="<connection string>"

// Start the server
$ nodemon app
```

To use graphiql IDE, go to http://localhost:4000/graphql

To start the client, open up another terminal.
```
// Navigate to client directory
$ cd ../client/

// Install dependencies
$ npm i

// Start the client
$ npm start
```
