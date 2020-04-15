import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import AnimeList from "./components/AnimeList";

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Emily's Anime List</h1>
                <AnimeList/>
            </div>
        </ApolloProvider>
    );
}

export default App;
