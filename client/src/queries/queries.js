import {gql} from 'apollo-boost';

const getAnimesQuery = gql`
    {
        animes{
            name
            id
        }    
    }
`;

const getStudiosQuery = gql`
    {
        studios{
            name
            id
        }    
    }
`;

const addAnimeMutation = gql`
    mutation($name: String!, $genre:String!, $studioId: ID!){
        addAnime(name:$name, genre:$genre, studioId:$studioId){
        name
        id
        }
    }
`;

const getAnimeQuery = gql`
    query($id: ID) {
        anime(id: $id) {
            id
            name
            genre
            studio {
                id
                name
                year
                animes {
                    name
                    id
                }
            }
        }
    }
`;
export {getStudiosQuery, getAnimesQuery, addAnimeMutation,getAnimeQuery};