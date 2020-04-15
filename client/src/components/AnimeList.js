import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAnimesQuery = gql`
    {
        animes{
            name
            id
        }    
    }
`;

function AnimeList(props) {
    console.log(props);
    return (
        <div>
            <ul id="anime-list">
                <li>
                    <li>Anime Name</li>
                </li>
            </ul>
        </div>
    );
}

export default graphql(getAnimesQuery)(AnimeList);
