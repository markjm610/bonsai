import React from 'react'
import { mount } from 'enzyme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import apolloUri from './config'
import Tree from './Tree'
import InsertForm from './InsertForm'

it('renders without crashing', () => {

    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    mount(<ApolloProvider client={client}><Tree numberOfNodes={10} setNumberOfNodes={() => { }} /></ApolloProvider>)
})

// it('renders InsertForm and Leaf components as children', () => {

//     const client = new ApolloClient({
//         uri: apolloUri,
//         cache: new InMemoryCache()
//     })

//     const wrapper = mount(<ApolloProvider client={client}><Tree numberOfNodes={10} setNumberOfNodes={() => { }} /></ApolloProvider>)

//     // expect(wrapper.contains(
//     // <InsertForm 
//     //     root={{ id: 'id', value: 50, leftId: 'leftId', rightId: 'rightId' }} 
//     //     tree={{}}
//     //     numberOfNodes={}
//     //     />)).toBe(true)

// })