import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal, inorderTraversal, postorderTraversal } from './utils'
import TrashCan from './TrashCan'
import ControlArea from './ControlArea'

type Props = {
    treeId: string;
}

const FillTree: React.FC<Props> = ({ treeId }) => {
    const {
        numberOfNodes,
    } = useContext(Context)

    return (<>

        {
            numberOfNodes < 15
            && <div className='top-dialogue'>Can you fill all 4 levels of the binary search tree?</div>
        }
        {
            numberOfNodes === 15
            && <div className='top-dialogue'>Nice job! The tree is full!</div>
        }
        <div className='trash-can-container'>
            <TrashCan />
        </div>
        <ControlArea />
    </>
    )
}

export default FillTree