import React from 'react';
import {graphql} from 'react-apollo';
import {getAnimesQuery} from "../queries/queries";
import AnimeDetails from "./AnimeDetails";

//render a list of animes.
function AnimeList(props) {
    const [selected, setSelected] = React.useState(null);
    const displayAnimes = () => {
        const data = props.data;
        if(data.loading){
            return(<div>Loading animes...</div>)
        }else {
            return data.animes.map(anime => {
                return (
                    //depending on which anime is clicked, set it
                    <li key={anime.id} onClick={(e)=>{setSelected( anime.id)}}>{anime.name}</li>
                )
            })
        }
    };
    return (
        <div>
            <ul id="anime-list">
                {displayAnimes()}
            </ul>
            <AnimeDetails animeId={selected}/>
        </div>
    );
}

export default graphql(getAnimesQuery)(AnimeList);
