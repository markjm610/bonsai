import React, { useState } from 'react';
// import ApolloClient from 'apollo-boost'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import apolloUri from './config'
import Tree from './Tree';
import FillTree from './FillTree';


const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache()
})


function App() {

  const [numberOfNodes, setNumberOfNodes] = useState(0)

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <FillTree numberOfNodes={numberOfNodes} />
        <Tree numberOfNodes={numberOfNodes} setNumberOfNodes={setNumberOfNodes} />
      </div>
    </ApolloProvider>
  );
}

export default App;
