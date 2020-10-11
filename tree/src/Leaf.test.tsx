import React from 'react'
import { mount } from 'enzyme'
import Leaf from './Leaf'

it('renders without crashing', () => {
    mount(<Leaf
        id={'id'}
        position={{ x: 48, y: 15 }}
        node={{ id: 'id', value: 50, leftId: 'leftId', rightId: 'rightId' }}
        tree={{}}
        level={0}
        beginInsert={false}
        setBeginInsert={() => { }}
        numberOfNodes={10}
    />)
})

it('recursively renders a component for each node in the tree', () => {
    const tree = {
        'id1': {
            id: 'id1',
            value: 50,
            leftId: 'id2',
            rightId: 'id3'
        },
        'id2': {
            id: 'id2',
            value: 40,
            leftId: null,
            rightId: null
        },
        'id3': {
            id: 'id3',
            value: 60,
            leftId: null,
            rightId: null
        },
    }
    const wrapper = mount(
        <Leaf
            id={'id1'}
            position={{ x: 48, y: 15 }} node={{
                id: 'id1',
                value: 50,
                leftId: 'id2',
                rightId: 'id3'
            }}
            tree={tree}
            level={0}
            beginInsert={false}
            setBeginInsert={() => { }}
            numberOfNodes={3}
        />)

    expect(wrapper.contains('50')).toBe(true)
    expect(wrapper.contains('40')).toBe(true)
    expect(wrapper.contains('60')).toBe(true)
})

it('displays node value', () => {
    const wrapper = mount(<Leaf
        id={'id1'}
        position={{ x: 48, y: 15 }}
        node={{ id: 'id', value: 50, leftId: 'leftId', rightId: 'rightId' }}
        tree={{}}
        level={0}
        beginInsert={false}
        setBeginInsert={() => { }}
        numberOfNodes={10}
    />)

    expect(wrapper.contains('50')).toBe(true)
})