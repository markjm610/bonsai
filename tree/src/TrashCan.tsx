import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_NODE, GET_TREE, CLEAR_TREE } from './queries'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDrop } from 'react-dnd';
import { Tooltip } from '@material-ui/core';
import Context from './Context';
import { TreeNode } from './types';

const TrashCan: React.FC = () => {
    const { setHideDeletedNodes, treeState } = useContext(Context)

    const [clearTree,] = useMutation(CLEAR_TREE)
    const [deleteNode,] = useMutation(DELETE_NODE)
    const handleDrop = (item: any) => {
        setHideDeletedNodes(findNodesToHide(treeState[item.id]))
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

    function findNodesToHide(node: TreeNode, nodes = new Set()) {
        nodes.add(node.id)
        if (node.leftId) {
            findNodesToHide(treeState[node.leftId])
        }
        if (node.rightId) {
            findNodesToHide(treeState[node.rightId])
        }
        return nodes
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
        <Tooltip title='Drag nodes here to delete'>
            <DeleteIcon fontSize='inherit' ref={drop} htmlColor={isOver ? 'red' : undefined} />
        </Tooltip>
    )
}

export default TrashCan