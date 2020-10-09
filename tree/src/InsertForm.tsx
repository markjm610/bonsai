import React, { useState } from 'react'
import { TreeNode } from './types'

type Props = {
    tree: any;
    root: TreeNode;
}

function insertNode(value: number, node: TreeNode, tree: any): [string, string] {
    if (value > node.value) {
        if (node.rightId) {
            return insertNode(value, tree[node.rightId], tree)
        } else {
            return [node.id, 'right']
        }
    } else {
        if (node.leftId) {
            return insertNode(value, tree[node.leftId], tree)
        } else {
            return [node.id, 'left']
        }
    }
}

const InsertForm: React.FC<Props> = ({ tree, root }) => {

    const [value, setValue] = useState('')

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // insertNode needs to find the parent and whether it will be left or right child
        const [parentNode, childType] = insertNode(parseInt(value), root, tree)
        // Send mutation to graphql
        // Display new tree
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