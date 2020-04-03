const graphql = require('graphql');
const _ =require('lodash');

//grab properties from graphql package
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//dummy data
var animes = [
    {name: 'Doctor Stone', genre: 'Sci-Fi', id: '1'},
    {name: 'My Hero Academia', genre: 'Action', id: '2'},
    {name: 'Fruits Basket', genre: 'Slice of life', id: '3'},
];

//define first object type which contain different fields
const AnimeType = new GraphQLObjectType({
   name:'Anime',
   fields:() => ({
       id: {type: GraphQLString},
       name: {type: GraphQLString},
       genre: {type: GraphQLString}
   })
});

//define root query which is used to jump into the graph
const RootQuery = new GraphQLObjectType({
   name:'RootQueryType',
   fields:{
       anime:{
           type:AnimeType,
           args:{id: {type: GraphQLString}},
           resolve(parent,args){
               //code to get data from db/other source
                return _.find(animes, {id: args.id});
           }
       }
   }
});

//defining which query to use (i.e root query)
module.exports = new GraphQLSchema({
    query: RootQuery
});