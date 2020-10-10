import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { TreeNode } from './types'
import { ADD_TREE_NODE, GET_TREENODES } from './queries'

type Props = {
    tree: any;
    root: TreeNode;
    numberOfNodes: number;
}

function insertNode(value: number, node: TreeNode, tree: any, level: number): [string, Boolean | string] {
    if (level > 3) {
        return ['invalid move', 'invalid move']
    }
    if (value > node.value) {
        if (node.rightId) {
            return insertNode(value, tree[node.rightId], tree, level + 1)
        } else {
            return [node.id, false]
        }
    } else {
        if (node.leftId) {
            return insertNode(value, tree[node.leftId], tree, level + 1)
        } else {
            return [node.id, true]
        }
    }
}

const InsertForm: React.FC<Props> = ({ tree, root, numberOfNodes }) => {

    const [value, setValue] = useState('')
    const [decimalError, setDecimalError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const [validMove, setValidMove] = useState(true)
    const [addTreeNode, { data }] = useMutation(ADD_TREE_NODE)

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!validMove) {
            setValidMove(true)
        }

        setValue(e.currentTarget.value)

        if (e.currentTarget.value.includes('.')) {
            setDecimalError(true)
        } else if (decimalError && e.currentTarget.value) {
            setDecimalError(false)
        }

        if (parseInt(e.currentTarget.value) > 100 || parseInt(e.currentTarget.value) < 0) {
            setNumberError(true)
        } else if (numberError && e.currentTarget.value) {
            setNumberError(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (decimalError || numberError) {
            return
        }

        // insertNode needs to find the parent and whether it will be left or right child
        const [parentNode, isLeftChild] = insertNode(parseInt(value), root, tree, 1)
        // Send mutation to graphql

        if (parentNode === 'invalid move' && isLeftChild === 'invalid move') {

            setValidMove(false)
            return
        }
        addTreeNode({
            variables: {
                value: parseInt(value),
                root: false,
                parentId: parentNode,
                isLeftChild
            },
            refetchQueries: [{ query: GET_TREENODES }]
        })
        setValue('')
    }

    return (
        <>
            {!validMove && <div>Invalid Move</div>}
            {(decimalError || numberError) && <div>Must be whole number between 0 and 100</div>}
            {numberOfNodes < 15 &&
                <form onSubmit={handleSubmit} className='insert-form'>
                    <label>Enter number to add to tree:</label>
                    <input type='number' onChange={handleInputChange} value={value} className='value-input' />
                    <button className='add-node-button'>Add</button>
                </form>
            }

        </>
    )
}

export default InsertForm