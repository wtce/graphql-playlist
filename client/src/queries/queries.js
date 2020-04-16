import { gql } from 'apollo-boost';

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

export { getStudiosQuery, getAnimesQuery};