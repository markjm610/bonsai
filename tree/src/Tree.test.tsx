import React from 'react'
import { mount } from 'enzyme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import apolloUri from './config'
import Tree from './Tree'

it('renders without crashing', () => {

    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    mount(<ApolloProvider client={client}><Tree numberOfNodes={10} setNumberOfNodes={() => { }} /></ApolloProvider>)
})