import React from 'react';
import {graphql} from 'react-apollo';
import {getAnimesQuery} from "../queries/queries";


function AnimeList(props) {
    const displayAnimes = () => {
        const data = props.data;
        if(data.loading){
            return(<div>Loading animes...</div>)
        }else {
            return data.animes.map(anime => {
                return (
                    <li key={anime.id}>{anime.name}</li>
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
