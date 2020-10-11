import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import apolloUri from './config'
import InsertForm from './InsertForm'

it('renders without crashing', () => {
    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    mount(<ApolloProvider client={client}>
        <InsertForm
            numberOfNodes={10}
            tree={{}}
            root={{ id: 'id', leftId: 'leftId', rightId: 'rightId', value: 50 }}
            traversedNodeIds={['id', 'id2', 'id3', 'right child of id3']}
            setTraversedNodeIds={() => { }}
            beginInsert={false}
            setBeginInsert={() => { }}
        />
    </ApolloProvider>)
})

it('displays form when tree is not full', () => {
    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    const wrapper = mount(<ApolloProvider client={client}>
        <InsertForm
            numberOfNodes={10}
            tree={{}}
            root={{ id: 'id', leftId: 'leftId', rightId: 'rightId', value: 50 }}
            traversedNodeIds={['id', 'id2', 'id3', 'right child of id3']}
            setTraversedNodeIds={() => { }}
            beginInsert={false}
            setBeginInsert={() => { }}
        />
    </ApolloProvider>)

    expect(wrapper.contains(<label className='form-label'>Click the middle of the blank node to enter a number, then press enter.</label>)).toBe(true)

})

it('does not display form when tree is full', () => {
    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    })

    const wrapper = mount(<ApolloProvider client={client}>
        <InsertForm
            numberOfNodes={15}
            tree={{}}
            root={{ id: 'id', leftId: 'leftId', rightId: 'rightId', value: 50 }}
            traversedNodeIds={['id', 'id2', 'id3', 'right child of id3']}
            setTraversedNodeIds={() => { }}
            beginInsert={false}
            setBeginInsert={() => { }}
        />
    </ApolloProvider>)

    expect(wrapper.contains(<label className='form-label'>Click the middle of the blank node to enter a number, then press enter.</label>)).toBe(false)

})