import { useMutation } from '@apollo/client'
import React, { useState, useContext } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal } from './utils'

type Props = {
    numberOfNodes: number;
    treeId: string;
    allowInteraction: boolean;
}

const FillTree: React.FC<Props> = ({ numberOfNodes, treeId, allowInteraction }) => {
    const { flattened, setFlattened, test, setTest, rootId, treeState, setTraversalValues } = useContext(Context)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        if (!allowInteraction) {
            return
        }
        clearTree({
            variables: { id: treeId },
            refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        })
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
        setTraversalValues(preorderTraversal(treeState, treeState[rootId]))
    }

    return (
        <div className='dialogue-container'>
            <div className='buttons-container'>
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={flatten} className='start-over-button'>{!flattened ? 'Flatten' : 'Unflatten'}</button>
                <button onClick={preorderClick} className='start-over-button'>Show Preorder</button>
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