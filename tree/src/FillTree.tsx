import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CLEAR_TREE, GET_TREENODES } from './queries'

const FillTree: React.FC = () => {

    const [full, setFull] = useState(false)
    const [clearTree, { data }] = useMutation(CLEAR_TREE)

    const startOver = () => {
        clearTree({
            refetchQueries: [{ query: GET_TREENODES }]
        })
    }

    return (
        <div className='dialogue-container'>
            {!full &&
                <>
                    <div>Can you fill all 4 levels of the binary search tree?</div>
                    <button onClick={startOver}>Start Over</button>
                </>
            }
            {full && <div>Congratulations! The tree is full!</div>}
        </div>
    )
}

export default FillTree