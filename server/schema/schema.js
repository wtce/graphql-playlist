const graphql = require('graphql');
const _ =require('lodash');
const Anime = require('../models/anime');
const Studio = require('../models/studio');

// grab properties from graphql package
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } = graphql;

// dummy data
// const animes = [
//     {name: 'Doctor Stone', genre: 'Sci-Fi', id: '1', studioId: '1'},
//     {name: 'My Hero Academia', genre: 'Action', id: '2', studioId: '2'},
//     {name: 'Tokyo Ghoul', genre: 'Mystery', id: '3', studioId: '3'},
//     {name: 'Fruits Basket', genre: 'Slice of Life', id: '4', studioId: '1'},
//     {name: 'Boruto', genre:'Action', id: '5', studioID: '3'},
//     {name: 'Carole & Tuesday', genre: 'Drama', id: '6', studioId: '2'},
// ];

//define first object type which contain different fields
const AnimeType = new GraphQLObjectType({
   name:'Anime',
    // needs to be a function so it can be run later on
   fields:() => ({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       //type relation finding studio that made anime by studioID
       studio: {
           type: StudioType,
           resolve(parent, args){
               console.log(parent);
               // return _.find(studios, {id: parent.studioId});
           }
       }
   })
});

const StudioType = new GraphQLObjectType({
    name:'Studio',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        year: {type: GraphQLInt},
        animes: {
            type: new GraphQLList(AnimeType),
            resolve(parent, args){
                // return _.filter(animes,{studioId: parent.id})
            }
        }
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
               //  return _.find(animes, {id: args.id});
           }
       },
       studio:{
           type: StudioType,
           args: {id: {type: GraphQLID}},
            resolve(parent, args){
               // return _.find(studios, {id: args.id})
           }
       },
       // lists all animes or studios
       animes: {
           type: new GraphQLList(AnimeType),
           resolve(parent,args){
               // return animes
           }
       },
       studios: {
           type: new GraphQLList(StudioType),
           resolve(parent,args){
               // return studios
           }
       }
   }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudio:{
            type: StudioType,
            args: {
                name: {type: GraphQLString},
                year: {type: GraphQLInt}
            },
            resolve(parent, args){
                let studio = new Studio({
                    name: args.name,
                    year: args.year,
                });
                return studio.save();
            }
        },
        addAnime: {
            type: AnimeType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                studioId: {type: GraphQLID}
            },
            resolve(parent, args){
                let anime = new Anime({
                    name: args.name,
                    genre: args.genre,
                    studioId: args.studioId
                });
                return anime.save();
            }
        }
    }
});

//defining which query to use (i.e root query)
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});