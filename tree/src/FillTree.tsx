import { useMutation } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { CLEAR_TREE, GET_TREE } from './queries'
import Context from './Context'
import { preorderTraversal, inorderTraversal, postorderTraversal } from './utils'
import TrashCan from './TrashCan'
import ControlArea from './ControlArea'
import BarDropZone from './BarDropZone'

type Props = {
    treeId: string;
}

const FillTree: React.FC<Props> = ({ treeId }) => {
    const {
        numberOfNodes,
        barPosition
    } = useContext(Context)


    return (
        <div className='drop-zones-and-dialogue'>
            <BarDropZone location='left' />
            <div className='dialogue-and-instruction'>
                {
                    numberOfNodes < 15
                    && <div className='top-dialogue'>Can you fill all 4 levels of the binary search tree?</div>
                }
                {
                    numberOfNodes === 15
                    && <div className='top-dialogue'>Nice job! The tree is full!</div>
                }
                {/* <div>Click the middle of the blank node to enter a number, then press enter.</div> */}
            </div>
            <BarDropZone location='right' />
            <div className='trash-can-container'>
                <TrashCan />
            </div>
            <ControlArea />
        </div>
    )
}

export default FillTree