import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'
import { DELETE_NODE, GET_TREE } from './queries'
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDrop } from 'react-dnd';

const TrashCan: React.FC = () => {

    const handleDrop = (item: any) => {
        console.log(item)
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'node',
        drop: (item) => {
            handleDrop(item);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <DeleteIcon fontSize='inherit' ref={drop} />
    )
}

export default TrashCan