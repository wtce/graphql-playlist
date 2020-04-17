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
    GraphQLList,
    GraphQLNonNull,
    } = graphql;

//define an anime which contains different fields
const AnimeType = new GraphQLObjectType({
   name:'Anime',
   fields:() => ({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       //type relation finding studio that made anime by studioID
       studio: {
           type: StudioType,
           resolve(parent, args){
               // return _.find(studios, {id: parent.studioId});
               return Studio.findById(parent.studioId);
           }
       }
   })
});

//defines a studio and relationship to anime
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
                return Anime.find({studioId: parent.id});
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
               return Anime.findById(args.id);
           }
       },
       studio:{
           type: StudioType,
           args: {id: {type: GraphQLID}},
            resolve(parent, args){
               // return _.find(studios, {id: args.id})
                return Studio.findById(args.id);
           }
       },
       // lists all animes or studios
       animes: {
           type: new GraphQLList(AnimeType),
           resolve(parent,args){
               // return animes
               return Anime.find({});
           }
       },
       studios: {
           type: new GraphQLList(StudioType),
           resolve(parent,args){
               // return studios
               return Studio.find({});
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                year: {type: new GraphQLNonNull(GraphQLInt)}
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                studioId: {type: new GraphQLNonNull(GraphQLID)}
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