import React, { useContext, useState } from 'react'
import { TreeNode, TreeObject } from './types'
import FakeNode from './FakeNode'
import { useSpring, animated } from 'react-spring'
import { insertNode } from './utils'
import Context from './Context'


type Props = {
    tree: TreeObject;
    root: TreeNode;
    numberOfNodes: number;
    traversedNodeIds: string[];
    setTraversedNodeIds: Function;
    beginInsert: boolean;
    setBeginInsert: Function;
    treeId: string;
    setLoadingAnimationOn: Function;
    allowInteraction: boolean;
    setAllowInteraction: Function;
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
    setLoadingAnimationOn,
    allowInteraction,
    setAllowInteraction
}) => {

    const { showPreorder, showInorder, showPostorder } = useContext(Context)

    const [value, setValue] = useState('')
    const [decimalError, setDecimalError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const [validMove, setValidMove] = useState(true)
    const [storedParentId, setStoredParentId] = useState('')
    const [isStoredLeftChild, setStoredIsLeftChild] = useState(false)
    const [fakeNodeValue, setFakeNodeValue] = useState('')
    const [inputFade, setInputFade] = useState(false)



    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        // if (!allowInteraction) {
        //     return
        // }

        // setAllowInteraction(false)
        // console.log(allowInteraction)
        if (!validMove) {
            setValidMove(true)
        }

        if (inputFade) {
            setInputFade(false)
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
        // if (!allowInteraction) {
        //     return
        // }
        // setAllowInteraction(false)
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
        setLoadingAnimationOn(false)

        // Clear input
        setValue('')
    }

    const inputAnimated = useSpring({
        to: { opacity: beginInsert ? 0 : 1 },
        from: { opacity: 0.5 }
    })

    return (
        <>
            {numberOfNodes < 15 &&
                <form onSubmit={handleSubmit} className='insert-form'>

                    <label className='form-label'>Click the middle of the blank node to enter a number, then press enter.</label>
                    {/* <button className='add-node-button'>Add</button> */}
                    <div className='input-container'
                    >
                        <animated.input
                            style={inputFade ? inputAnimated : {
                                opacity: beginInsert ? 0 : 1
                            }}
                            // style={inputStyle}
                            type='number'
                            onChange={handleInputChange}
                            value={value}
                            className='value-input'
                            id='input'
                            disabled={showPreorder || showInorder || showPostorder || beginInsert || !allowInteraction}
                        />
                        {beginInsert &&
                            <FakeNode
                                value={fakeNodeValue}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                storedParentId={storedParentId}
                                isStoredLeftChild={isStoredLeftChild}
                                treeId={treeId}
                                setInputFade={setInputFade}
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