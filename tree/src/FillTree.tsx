import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'

type Props = {
    numberOfNodes: number;
    treeId: string;
}

const FillTree: React.FC<Props> = ({ numberOfNodes, treeId }) => {

    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        clearTree({
            variables: { id: treeId },
            refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        })
    }

    const flatten = () => {

    }

    return (
        <div className='dialogue-container'>
            <div className='buttons-container'>
                <button onClick={startOver} className='start-over-button'>Start From Root Only</button>
                <button onClick={flatten} className='start-over-button'>Flatten</button>
            </div>
            {numberOfNodes < 15 &&
                <div>Can you fill all 4 levels of the binary search tree?</div>
            }
            {numberOfNodes === 15 && <div>Nice job! The tree is full!</div>}

        </div>
    )
}

export default FillTree