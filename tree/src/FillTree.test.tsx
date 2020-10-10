import React from 'react'
import { mount } from 'enzyme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import apolloUri from './config'
import FillTree from './FillTree'


it('renders without crashing', () => {

    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    mount(<ApolloProvider client={client}><FillTree numberOfNodes={10} /></ApolloProvider>)
})

it('asks to fill the tree when the tree is not full', () => {
    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })
    const wrapper = mount(<ApolloProvider client={client}><FillTree numberOfNodes={10} /></ApolloProvider>)
    expect(wrapper.contains(<div>Can you fill all 4 levels of the binary search tree?</div>)).toBe(true)
    expect(wrapper.contains(<div>Nice job! The tree is full!</div>)).toBe(false)
})

it('says the tree is full when it is full', () => {
    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })
    const wrapper = mount(<ApolloProvider client={client}><FillTree numberOfNodes={15} /></ApolloProvider>)
    expect(wrapper.contains(<div>Can you fill all 4 levels of the binary search tree?</div>)).toBe(false)
    expect(wrapper.contains(<div>Nice job! The tree is full!</div>)).toBe(true)
})