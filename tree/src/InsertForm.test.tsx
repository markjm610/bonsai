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
        />
    </ApolloProvider>)

    expect(wrapper.contains(<label>Enter number to add to tree:</label>)).toBe(true)

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
        />
    </ApolloProvider>)

    expect(wrapper.contains(<label>Enter number to add to tree:</label>)).toBe(false)

})




// it('displays error message when a decimal is entered', () => {
//     const client = new ApolloClient({
//         uri: apolloUri,
//         cache: new InMemoryCache()
//     })

//     const wrapper = mount(<ApolloProvider client={client}>
//         <InsertForm
//             numberOfNodes={10}
//             tree={{}}
//             root={{ id: 'id', leftId: 'leftId', rightId: 'rightId', value: 50 }}
//         />
//     </ApolloProvider>)

//     const input = wrapper.find('.value-input')

//     input.simulate('change', { currentTarget: { value: '9.1' } })

//     const newWrapper = mount(<ApolloProvider client={client}>
//         <InsertForm
//             numberOfNodes={10}
//             tree={{}}
//             root={{ id: 'id', leftId: 'leftId', rightId: 'rightId', value: 50 }}
//         />
//     </ApolloProvider>)
//     expect(newWrapper.contains(<div>Must be whole number between 0 and 100</div>)).toBe(true)
// })


