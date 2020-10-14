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
            refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        })
    }

    return (
        <div className='dialogue-container'>
            <button onClick={startOver} className='start-over-button'>Start Over</button>
            {numberOfNodes < 15 &&
                <div>Can you fill all 4 levels of the binary search tree?</div>
            }
            {numberOfNodes === 15 && <div>Nice job! The tree is full!</div>}

        </div>
    )
}

export default FillTree