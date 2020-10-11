import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode, TreeObject } from './types'
import { GET_ROOT, GET_TREENODES } from './queries'
import InsertForm from './InsertForm'


type Props = {
    numberOfNodes: number;
    setNumberOfNodes: Function;
}

const Tree: React.FC<Props> = ({ numberOfNodes, setNumberOfNodes }) => {
    const { data: rootData } = useQuery(GET_ROOT);
    const { data: treeNodesData } = useQuery(GET_TREENODES)
    const [treeState, setTreeState] = useState({})
    const [traversedNodeIds, setTraversedNodeIds] = useState([])
    const [beginInsert, setBeginInsert] = useState(false)


    useEffect(() => {
        if (rootData && treeNodesData) {

            // Object of TreeNodes
            const treeNodesObj: TreeObject = {}

            // This loop converts the tree from an array to a nested object for constant time lookup of nodes
            treeNodesData.treeNodes.forEach((treeNode: TreeNode) => {
                treeNodesObj[treeNode.id] = {
                    id: treeNode.id,
                    value: treeNode.value,
                    leftId: treeNode.leftId,
                    rightId: treeNode.rightId
                }
            })

            // Store the nested object in the state so this and other components have access to it
            setTreeState(treeNodesObj)

            // Need number of nodes to keep track of whether the tree is full or not
            setNumberOfNodes(treeNodesData.treeNodes.length)

        }


    }, [rootData, treeNodesData])

    return (
        <>
            {(rootData && treeNodesData) &&
                <>
                    <div className='form-container'>
                        <InsertForm
                            root={rootData.root}
                            tree={treeState}
                            numberOfNodes={numberOfNodes}
                            traversedNodeIds={traversedNodeIds}
                            setTraversedNodeIds={setTraversedNodeIds}
                            beginInsert={beginInsert}
                            setBeginInsert={setBeginInsert}
                        />
                    </div>
                    <div className='leaves-container'>
                        <Leaf
                            id={rootData.root.id}
                            node={rootData.root}
                            position={{ x: 48, y: 30 }}
                            tree={treeState}
                            level={0}
                            beginInsert={beginInsert}
                            setBeginInsert={setBeginInsert}
                            numberOfNodes={numberOfNodes}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Tree