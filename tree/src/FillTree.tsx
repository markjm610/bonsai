import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal, inorderTraversal, postorderTraversal } from './utils'
import TrashCan from './TrashCan'
import ControlArea from './ControlArea'

type Props = {
    treeId: string;
    allowInteraction: boolean;
    beginInsert: boolean;
}

const FillTree: React.FC<Props> = ({ treeId, allowInteraction, beginInsert }) => {
    const {
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
        setInorder,
        showPostorder,
        setShowPostorder,
        setPostorder,
        numberOfNodes
    } = useContext(Context)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        if (!allowInteraction || beginInsert) {
            return
        }
        // clearTree({
        //     variables: { id: treeId },
        //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        // })
        setStartFromRoot(true)
    }



    function preorderClick(): any {
        if (!allowInteraction || beginInsert) {
            return
        }
        setShowPreorder(!showPreorder)
        if (showInorder) {
            setShowInorder(false)
        }
        if (showPostorder) {
            setShowPostorder(false)
        }
    }

    function inorderClick(): any {
        if (!allowInteraction || beginInsert) {
            return
        }
        setShowInorder(!showInorder)
        if (showPreorder) {
            setShowPreorder(false)
        }
        if (showPostorder) {
            setShowPostorder(false)
        }
    }

    function postorderClick(): any {
        if (!allowInteraction || beginInsert) {
            return
        }
        setShowPostorder(!showPostorder)
        if (showPreorder) {
            setShowPreorder(false)
        }
        if (showInorder) {
            setShowInorder(false)
        }
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

    useEffect(() => {
        if (Object.keys(treeState).length && rootId) {
            setPostorder(postorderTraversal(treeState, treeState[rootId]))
        }
    }, [treeState, rootId])

    useEffect(() => {
        if (readyToClearTree) {
            clearTree({
                variables: { id: treeId },
                refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
            })
            setStartFromRoot(false)
            setReadyToClearTree(false)
        }
    }, [readyToClearTree])

    return (<>
        <div className='dialogue-container'>
            <div className='buttons-container'>
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={preorderClick} className='start-over-button'>{!showPreorder ? 'Show Preorder' : 'Back to Tree'}</button>
                <button onClick={inorderClick} className='start-over-button'>{!showInorder ? 'Show Inorder' : 'Back to Tree'}</button>
                <button onClick={postorderClick} className='start-over-button'>{!showPostorder ? 'Show Postorder' : 'Back to Tree'}</button>
            </div>
            {
                numberOfNodes < 15 &&
                <div>Can you fill all 4 levels of the binary search tree?</div>
            }
            {numberOfNodes === 15 && <div>Nice job! The tree is full!</div>}
        </div >
        <div className='trash-can-container'>
            <TrashCan />
        </div>
        <ControlArea />
    </>
    )
}

export default FillTree