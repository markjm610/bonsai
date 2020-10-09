import React from 'react';
// import ApolloClient from 'apollo-boost'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import InsertForm from './InsertForm';
import Tree from './Tree';
import FillTree from './FillTree';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <FillTree />
        <Tree />
      </div>
    </ApolloProvider>
  );
}

export default App;
