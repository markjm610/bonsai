import React, { useState } from 'react'
import { TreeNode, TreeObject } from './types'
import FakeNode from './FakeNode'
import { useSpring } from 'react-spring'


type Props = {
    tree: TreeObject;
    root: TreeNode;
    numberOfNodes: number;
    traversedNodeIds: string[];
    setTraversedNodeIds: Function;
    beginInsert: boolean;
    setBeginInsert: Function;
    treeId: string;
    setAnimationOn: Function;
}

// insertNode will find the spot of the new node and keep track of the IDs of each node traversed so the
// the FakeNode component can look up the locations of the nodes on the screen
function insertNode(value: number, node: TreeNode, tree: TreeObject, level: number, traversedNodes: string[] = []): [string, boolean, string[]] {
    console.log(node)
    traversedNodes.push(node.id)

    if (level > 3) {
        return ['invalid move', false, traversedNodes]
    }

    if (value > node.value) {
        if (node.rightId) {
            return insertNode(value, tree[node.rightId], tree, level + 1, traversedNodes)
        } else {
            return [node.id, false, traversedNodes]
        }
    } else {
        if (node.leftId) {
            return insertNode(value, tree[node.leftId], tree, level + 1, traversedNodes)
        } else {
            return [node.id, true, traversedNodes]
        }
    }


}

const InsertForm: React.FC<Props> = ({
    treeId,
    tree,
    root,
    numberOfNodes,
    traversedNodeIds,
    setTraversedNodeIds,
    beginInsert,
    setBeginInsert,
    setAnimationOn
}) => {

    const [value, setValue] = useState('')
    const [decimalError, setDecimalError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const [validMove, setValidMove] = useState(true)
    const [storedParentId, setStoredParentId] = useState('')
    const [isStoredLeftChild, setStoredIsLeftChild] = useState(false)
    const [fakeNodeValue, setFakeNodeValue] = useState('')

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!validMove) {
            setValidMove(true)
        }

        setValue(e.currentTarget.value)
        setFakeNodeValue(e.currentTarget.value)

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

        const input: any = document.querySelector('.value-input')
        if (input) {
            input.blur()
        }


        if (decimalError || numberError) {
            return
        }

        // insertNode needs to find the parent and whether it will be a left or right child
        const [parentNode, isLeftChild, traversedNodes] = insertNode(parseInt(value), root, tree, 1)

        // If move is invalid, update the state and do not continue
        if (parentNode === 'invalid move') {
            setValidMove(false)
            return
        }

        // Store parentNode, isLeftChild, and traversedNodes in state

        setStoredParentId(parentNode)

        setStoredIsLeftChild(isLeftChild)

        // Add ID of placeholder invisible node to traversedNodes array so it can be looked up for the animation
        if (isLeftChild) {
            traversedNodes.push(`left child of ${parentNode}`)
        } else {
            traversedNodes.push(`right child of ${parentNode}`)
        }


        setTraversedNodeIds(traversedNodes)

        // Trigger the inserting node animation
        setBeginInsert(true)

        // Turn off tree loading animation so it doesn't happen when the new node is added
        setAnimationOn(false)

        // Clear input
        setValue('')

    }

    // const inputStyle = useSpring({
    //     opacity: beginInsert ? 0 : 1
    // })

    return (
        <>
            {numberOfNodes < 15 &&
                <form onSubmit={handleSubmit} className='insert-form'>

                    <label className='form-label'>Click the middle of the blank node to enter a number, then press enter.</label>
                    {/* <button className='add-node-button'>Add</button> */}
                    <div className='input-container'
                    >
                        <input
                            style={{
                                opacity: beginInsert ? 0 : 1
                            }}
                            type='number'
                            onChange={handleInputChange}
                            value={value}
                            className='value-input'
                            id='input'
                        />
                        {beginInsert &&
                            <FakeNode
                                value={fakeNodeValue}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                storedParentId={storedParentId}
                                isStoredLeftChild={isStoredLeftChild}
                                treeId={treeId}
                            />}
                    </div>

                </form>
            }
            {!validMove && <div className='error-message'>Invalid Move</div>}
            {(decimalError || numberError) && <div className='error-message'>Must be whole number between 0 and 100</div>}
        </>
    )
}

export default InsertForm