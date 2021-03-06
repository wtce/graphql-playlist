import React from 'react';
import {graphql, compose} from 'react-apollo';
import {getStudiosQuery, addAnimeMutation, getAnimesQuery} from "../queries/queries";


function AddAnime(props) {
    //sets empty state for form
    const [formData, setFormData] = React.useState({
        name:'',
        genre:'',
        studioId:''
    });
    //gets list of studios on form
    const displayStudios = () => {
        const data = props.getStudiosQuery;
        if(data.loading){
            return(<option disabled>Loading studios...</option>);
        }else{
            return data.studios.map(studio => {
                return (<option key={ studio.id } value={ studio.id }>{ studio.name }</option>);
            });
        }
    };

    //once you click submit button, adds to db
    const submitForm = (e) => {
        e.preventDefault();
        props.addAnimeMutation({
            variables:{
                name:formData.name,
                genre:formData.genre,
                studioId:formData.studioId,
            },
            refetchQueries: [{query:getAnimesQuery}]
        });
    };

    return (
        <form id="add-anime" onSubmit={submitForm}>
            <div className="field">
                <label>Anime name:</label>
                <input type="text" onChange={ (e) => setFormData({...formData, name:e.target.value})}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => setFormData({...formData, genre:e.target.value})}/>
            </div>
            <div className="field">
                <label>Studio:</label>
                <select onChange={ (e) => setFormData({...formData, studioId:e.target.value})}>
                    <option>Select studio</option>
                    {displayStudios()}
                </select>
            </div>
            <button>+</button>

        </form>
    );
}

//giving functions ability to be called upon
export default compose(
    graphql(getStudiosQuery, {name: "getStudiosQuery"}),
    graphql(addAnimeMutation, {name:"addAnimeMutation"})
)(AddAnime);