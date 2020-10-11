import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { TreeNode } from './types'
import { ADD_TREE_NODE, GET_TREENODES } from './queries'
import { useTransition, useSpring, animated } from 'react-spring'


type Props = {
    tree: any;
    root: TreeNode;
    numberOfNodes: number;
    traversedNodeIds: any;
    setTraversedNodeIds: Function;
}

function insertNode(value: number, node: TreeNode, tree: any, level: number, traversedNodes: any = []): [string, boolean, any] {

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

const InsertForm: React.FC<Props> = ({ tree, root, numberOfNodes, traversedNodeIds, setTraversedNodeIds }) => {

    const [value, setValue] = useState('')
    const [decimalError, setDecimalError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    const [validMove, setValidMove] = useState(true)
    const [addTreeNode, { data }] = useMutation(ADD_TREE_NODE)
    const [storedParentId, setStoredParentId] = useState('')
    const [isStoredLeftChild, setStoredIsLeftChild] = useState(false)
    const [test, setTest] = useState(false)
    const [beginInsert, setBeginInsert] = useState(false)



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

        // insertNode needs to find the parent and whether it will be a left or right child
        const [parentNode, isLeftChild, traversedNodes] = insertNode(parseInt(value), root, tree, 1)






        // When animation is done, send mutation to server using info in state

        // If move is invalid, update the state and do not send mutation to server
        if (parentNode === 'invalid move') {
            setValidMove(false)
            return
        }

        // Store parentNode, isLeftChild, and traversedNodes in state

        setStoredParentId(parentNode)

        setStoredIsLeftChild(isLeftChild)

        if (isLeftChild) {
            traversedNodes.push(`left child of ${parentNode}`)
        } else {
            traversedNodes.push(`right child of ${parentNode}`)
        }


        setTraversedNodeIds(traversedNodes)

        setBeginInsert(true)
        // Send mutation to GraphQL
        // addTreeNode({
        //     variables: {
        //         value: parseInt(value),
        //         root: false,
        //         parentId: parentNode,
        //         isLeftChild
        //     },
        //     refetchQueries: [{ query: GET_TREENODES }]
        // })


        // Set new tree node's opacity to 0 until the animation is complete
        // How to tell leaf component that a refetch has happened instead of a first load

        // Clear input
        // setValue('')
    }
    // const rootRef = document.getElementById(root.id)
    // const rootTop = rootRef?.getBoundingClientRect().top
    // const rootLeft = rootRef?.getBoundingClientRect().left
    // let rootLeftRef;
    // if (root.leftId) {
    //     rootLeftRef = document.getElementById(root.leftId)
    // }
    // const otherTop = rootLeftRef?.getBoundingClientRect().top
    // const otherLeft = rootLeftRef?.getBoundingClientRect().left
    const newNodeStyle = useSpring({
        // position: 'absolute',
        // backgroundColor: 'lightgreen',
        // from: { top: 0 },
        // to: { top: 50 }
        from: { top: 0, left: 0, position: 'absolute', backgroundColor: 'lightgreen' },
        to: async (next: Function) => {
            if (beginInsert && traversedNodeIds.length) {
                // console.log(traversedNodeIds)
                // traversedNodeIds.forEach(async (id: string) => {
                //     console.log(id)
                //     const nodeRef = document.getElementById(id)
                //     const nodeLocation = nodeRef?.getBoundingClientRect()
                //     if (!nodeLocation) {
                //         return
                //     }
                //     await next({ top: nodeLocation.top, left: nodeLocation.left })
                //     console.log('done')
                // })
                let i = 0

                while (i < traversedNodeIds.length) {

                    // if (i === traversedNodeIds.length) {
                    //     console.log('asd')
                    //     const previousNode = document.getElementById(traversedNodeIds[i - 1])?.getBoundingClientRect()
                    //     if (!previousNode) {
                    //         return
                    //     }
                    //     if (value > tree[traversedNodeIds[i - 1]].value) {
                    //         const left = previousNode.left + 100
                    //         await next({ top: previousNode.top + 100, left })
                    //     }

                    // } else {

                    const nodeRef = document.getElementById(traversedNodeIds[i])
                    const nodeLocation = nodeRef?.getBoundingClientRect()
                    if (!nodeLocation) {
                        return
                    }
                    await next({ top: nodeLocation.top, left: nodeLocation.left })


                    // }
                    i++

                }

                console.log('done')
                // Get rid of blinking thing in input when it gets submitted

                // addTreeNode({
                //     variables: {
                //         value: parseInt(value),
                //         root: false,
                //         parentId: parentNode,
                //         isLeftChild
                //     },
                //     refetchQueries: [{ query: GET_TREENODES }]
                // })

                setTraversedNodeIds([])
                setValue('')
            }

        }
        // backgroundColor: (decimalError || numberError || !validMove) ? 'red' : 'lightgreen',
        // boxShadow: test ? '2px 2px 5px black' : '0px 0px 0px black',
        // top: test ? rootTop : 0,
        // left: test ? rootLeft : 0
    })

    // insertNode builds path of refs using document.getElementById with id of each traversed node
    // store the path in the state somewhere as array of getboundingclientrect objects
    // traverse path using spring by looping over array and await next({position data}) for each one

    // Play animation for invalid moves?

    return (
        <>

            {numberOfNodes < 15 &&
                <form onSubmit={handleSubmit} className='insert-form'>
                    <label>Click the middle of the blank node to enter a number:</label>
                    <div className='input-container'
                    // style={newNodeStyle}
                    // style={(decimalError || numberError || !validMove) ? newNodeStyle : { backgroundColor: 'lightgreen' }} 
                    >
                        <animated.input
                            onClick={() => setTest(!test)}
                            style={newNodeStyle}
                            // style={(decimalError || numberError || !validMove) ? newNodeStyle : { backgroundColor: 'lightgreen' }}
                            // style={{
                            //     backgroundColor: (decimalError || numberError || !validMove) ? 'red' : 'lightgreen'
                            // }}
                            type='number'
                            onChange={handleInputChange}
                            value={value}
                            className='value-input' />
                    </div>
                    <button className='add-node-button'>Add</button>
                </form>
            }
            {!validMove && <div>Invalid Move</div>}
            {(decimalError || numberError) && <div>Must be whole number between 0 and 100</div>}
        </>
    )
}

export default InsertForm