import React from 'react';
import {graphql} from 'react-apollo';
import {getStudiosQuery} from "../queries/queries";


function AddAnime(props) {
    const displayStudios = () => {
        const data = props.data;
        if(data.loading){
            return(<option disabled>Loading studios...</option>);
        }else{
            return data.studios.map(studio => {
                return (<option key={ studio.id } value={ studio.id }>{ studio.name }</option>);
            });
        }
    };
    return (
        <form id="add-book">
            <div className="field">
                <label>Anime name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Studio:</label>
                <select>
                    <option>Select studio</option>
                    {displayStudios()}
                </select>
            </div>
            <button>+</button>

        </form>
    );
}

export default graphql(getStudiosQuery)(AddAnime);