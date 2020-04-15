import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAnimesQuery = gql`
    {
        animes{
            name
            genre
            id
        }    
    }
`;

function AnimeList(props) {
    const displayAnimes = () => {
        const data = props.data;
        if(data.loading){
            return(<div>Loading animes...</div>)
        }else {
            return data.animes.map(anime => {
                return (
                    <li>{anime.name}</li>
                )
            })
        }
    };
    return (
        <div>
            <ul id="anime-list">
                {displayAnimes()}
            </ul>
        </div>
    );
}

export default graphql(getAnimesQuery)(AnimeList);
