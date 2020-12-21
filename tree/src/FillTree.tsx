import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal, inorderTraversal } from './utils'

type Props = {
    numberOfNodes: number;
    treeId: string;
    allowInteraction: boolean;
}

const FillTree: React.FC<Props> = ({ numberOfNodes, treeId, allowInteraction }) => {
    const {
        flattened,
        setFlattened,
        test,
        setTest,
        rootId,
        treeState,
        setPreorder,
        showPreorder,
        setShowPreorder,
        setStartFromRoot,
        readyToClearTree,
        setReadyToClearTree,
        showInorder,
        setShowInorder,
        setInorder
    } = useContext(Context)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        if (!allowInteraction) {
            return
        }
        clearTree({
            variables: { id: treeId },
            refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        })
        setStartFromRoot(true)
    }

    function flatten(): any {
        // console.log(allowInteraction)
        if (!allowInteraction) {
            return
        }
        setFlattened(!flattened)
        if (test) {
            setTest(false)
        }
    }

    function preorderClick(): any {
        if (!allowInteraction) {
            return
        }
        setShowPreorder(!showPreorder)
    }

    function inorderClick(): any {
        if (!allowInteraction) {
            return
        }
        setShowInorder(!showInorder)
    }

    useEffect(() => {
        if (Object.keys(treeState).length && rootId) {
            setPreorder(preorderTraversal(treeState, treeState[rootId]))
        }
    }, [treeState, rootId])

    useEffect(() => {
        if (Object.keys(treeState).length && rootId) {
            setInorder(inorderTraversal(treeState, treeState[rootId]))
        }
    }, [treeState, rootId])

    // useEffect(() => {
    //     if (readyToClearTree) {
    //         clearTree({
    //             variables: { id: treeId },
    //             refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
    //         })
    //         setReadyToClearTree(false)
    //     }
    // }, [readyToClearTree])

    return (
        <div className='dialogue-container'>
            <div className='buttons-container'>
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={preorderClick} className='start-over-button'>{!showPreorder ? 'Show Preorder' : 'Back to Tree'}</button>
                <button onClick={inorderClick} className='start-over-button'>{!showInorder ? 'Show Inorder' : 'Back to Tree'}</button>
            </div>
            {
                numberOfNodes < 15 &&
                <div>Can you fill all 4 levels of the binary search tree?</div>
            }
            { numberOfNodes === 15 && <div>Nice job! The tree is full!</div>}
        </div >
    )
}

export default FillTree