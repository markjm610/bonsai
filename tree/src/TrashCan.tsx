import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_NODE, GET_TREE, CLEAR_TREE } from './queries'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDrop } from 'react-dnd';
import { Tooltip } from '@material-ui/core';

const TrashCan: React.FC = () => {
    const [clearTree,] = useMutation(CLEAR_TREE)
    const [deleteNode,] = useMutation(DELETE_NODE)
    const handleDrop = (item: any) => {
        if (!item.parentId) {
            clearTree({
                variables: { id: item.treeId },
                refetchQueries: [{ query: GET_TREE, variables: { id: item.treeId } }]
            })
        } else {
            deleteNode({
                variables: { id: item.id, parentId: item.parentId, isLeftChild: item.isLeftChild },
                refetchQueries: [{ query: GET_TREE, variables: { id: item.treeId } }]
            })
        }
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
        <Tooltip title='Drag a node here to delete'>
            <DeleteIcon fontSize='inherit' ref={drop} htmlColor={isOver ? 'red' : undefined} />
        </Tooltip>
    )
}

export default TrashCan