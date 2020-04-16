import React from 'react';
import {graphql} from 'react-apollo';
import {getAnimeQuery} from "../queries/queries";

function AnimeDetails(props) {
const displayAnimeDetails = () =>{
    const{anime} = props.data;
    if(anime){
        return(
            <div>
                <h2>{anime.name}</h2>
                <p>Genre: {anime.genre}</p>
                <p>Studio: {anime.studio.name}</p>
                <p>All animes by this studio:</p>
                <ul className="other-animes">
                    {anime.studio.animes.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    }else{
        return(
            <div>No anime selected...</div>
        )
    }
};
    return (
        <div id="anime-details">
            {displayAnimeDetails()}
        </div>
    );
}

export default graphql(getAnimeQuery, {
    options: (props) => {
        console.warn("f", props);
        return {
            variables: {
                id: props.animeId
            }
        }
    }
})(AnimeDetails);
