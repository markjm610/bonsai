import { useMutation } from '@apollo/client'
import React, { useState, useContext } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'

type Props = {
    numberOfNodes: number;
    treeId: string;
}

const FillTree: React.FC<Props> = ({ numberOfNodes, treeId }) => {
    const { flattened, setFlattened, test, setTest } = useContext(Context)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        clearTree({
            variables: { id: treeId },
            refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        })
    }

    const flatten = () => {
        setFlattened(!flattened)
        if (test) {
            setTest(false)
        }
    }

    const testClick = () => {
        setTest(!test)
        if (flattened) {
            setFlattened(false)
        }
    }

    return (
        <div className='dialogue-container'>
            <div className='buttons-container'>
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={flatten} className='start-over-button'>{!flattened ? 'Flatten' : 'Unflatten'}</button>
                <button onClick={testClick} className='start-over-button'>{!test ? 'Test' : 'Untest'}</button>
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