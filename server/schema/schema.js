const graphql = require('graphql');

const {GraphqlObjectType, GraphQLString, GraphQLSchema} = graphql;

const AnimeType = new GraphqlObjectType({
   name:'Anime',
   fields:() => ({
       id: {type:GraphQLString},
       name: {type: GraphQLString},
       genre:{type:GraphQLString}
   })
});

const RootQuery = GraphqlObjectType({
   name:'RootQueryType',
   fields:{
       anime:{
           type:AnimeType,
           args:{id: {type: GraphQLString}},
           resolve(parent,args){
               //code to get data from db/other source
           }
       }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});