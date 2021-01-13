import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal, inorderTraversal, postorderTraversal, determineClassName } from './utils'
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import BarDropZone from './BarDropZone'

type Props = {
    treeId: string;
}

const ButtonBar: React.FC<Props> = ({ treeId }) => {
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
        setNodeOffset,
        previousNodeOffset,
        allowInteraction,
        beginInsert,
        barPosition
    } = useContext(Context)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = (): undefined => {
        if (!allowInteraction || beginInsert || showPreorder || showInorder || showPostorder) {
            return
        }
        // clearTree({
        //     variables: { id: treeId },
        //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        // })
        setStartFromRoot(true)
    }

    function preorderClick(): undefined {
        if (!allowInteraction || beginInsert) {
            return
        }

        if (showPreorder) {
            setNodeOffset(previousNodeOffset)
        } else {
            setNodeOffset(0)
        }

        setShowPreorder(!showPreorder)

        if (showInorder) {
            setShowInorder(false)
        }

        if (showPostorder) {
            setShowPostorder(false)
        }
    }

    function inorderClick(): undefined {
        if (!allowInteraction || beginInsert) {
            return
        }

        if (showInorder) {
            setNodeOffset(previousNodeOffset)
        } else {
            setNodeOffset(0)
        }

        setShowInorder(!showInorder)
        if (showPreorder) {
            setShowPreorder(false)
        }
        if (showPostorder) {
            setShowPostorder(false)
        }
    }

    function postorderClick(): undefined {
        if (!allowInteraction || beginInsert) {
            return
        }
        if (showPostorder) {
            setNodeOffset(previousNodeOffset)
        } else {
            setNodeOffset(0)
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

    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            type: 'bar',
        },
        // begin: () => {

        // },
        // end: (item) => {

        // },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    useEffect(() => {
        preview(getEmptyImage());
    }, [])

    return (
        <>
            <div
                className={determineClassName('buttons-container', barPosition)}
                ref={(!allowInteraction || beginInsert) ? null : drag}
                style={{
                    opacity: isDragging ? 0 : 1
                }}
            >
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={preorderClick} className='start-over-button'>{!showPreorder ? 'Show Preorder' : 'Back to Tree'}</button>
                <button onClick={inorderClick} className='start-over-button'>{!showInorder ? 'Show Inorder' : 'Back to Tree'}</button>
                <button onClick={postorderClick} className='start-over-button'>{!showPostorder ? 'Show Postorder' : 'Back to Tree'}</button>
            </div>
        </>
    )
}

export default ButtonBar