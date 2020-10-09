import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { TreeNode } from './types'
import { ADD_TREE_NODE, GET_TREENODES } from './queries'

type Props = {
    tree: any;
    root: TreeNode;
    setTreeState: any;
}

function insertNode(value: number, node: TreeNode, tree: any): [string, Boolean] {
    if (value > node.value) {
        if (node.rightId) {
            return insertNode(value, tree[node.rightId], tree)
        } else {
            return [node.id, false]
        }
    } else {
        if (node.leftId) {
            return insertNode(value, tree[node.leftId], tree)
        } else {
            return [node.id, true]
        }
    }
}

const InsertForm: React.FC<Props> = ({ tree, root, setTreeState }) => {

    const [value, setValue] = useState('')
    const [addTreeNode, { data }] = useMutation(ADD_TREE_NODE)

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // insertNode needs to find the parent and whether it will be left or right child
        const [parentNode, isLeftChild] = insertNode(parseInt(value), root, tree)
        // Send mutation to graphql

        addTreeNode({
            variables: {
                value: parseInt(value),
                root: false,
                parentId: parentNode,
                isLeftChild
            },
            refetchQueries: [{ query: GET_TREENODES }]
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter number to add to tree:</label>
            <input type='number' onChange={handleInputChange} value={value} />
            <button>Add</button>
        </form>
    )
}

export default InsertForm