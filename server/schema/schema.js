const graphql = require('graphql');
const _ =require('lodash');

//grab properties from graphql package
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql;

//dummy data
var animes = [
    {name: 'Doctor Stone', genre: 'Sci-Fi', id: '1'},
    {name: 'My Hero Academia', genre: 'Action', id: '2'},
    {name: 'Tokyo Ghoul', genre: 'Mystery', id: '3'},
];

var studios = [
    {name: 'TMS Entertainment', year: '1964', id: '1'},
    {name: 'Bones', year: '1998', id: '2'},
    {name: 'Studio Pierrot', year: '1979', id: '3'},
];

//define first object type which contain different fields
const AnimeType = new GraphQLObjectType({
   name:'Anime',
   fields:() => ({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString}
   })
});

const StudioType = new GraphQLObjectType({
    name:'Studio',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        year: {type: GraphQLInt}
    })
});

//define root query which is used to jump into the graph
const RootQuery = new GraphQLObjectType({
   name:'RootQueryType',
   fields:{
       anime:{
           type:AnimeType,
           args:{id: {type: GraphQLID}},
           resolve(parent,args){
               //code to get data from db/other source
                return _.find(animes, {id: args.id});
           }
       },
       studio:{
           type: StudioType,
           args: {id: {type: GraphQLID}},
            resolve(parent, args){
               return _.find(studios, {id: args.id})
           }
       }
   }
});

//defining which query to use (i.e root query)
module.exports = new GraphQLSchema({
    query: RootQuery
});