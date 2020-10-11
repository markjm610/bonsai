import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode } from './types'
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
    const [endInsert, setEndInsert] = useState(false)


    useEffect(() => {
        if (rootData && treeNodesData) {

            // Type?
            const treeNodesObj: any = {}

            // This loop converts the tree from an array to a nested object for constant time lookup of nodes
            treeNodesData.treeNodes.forEach((treeNode: TreeNode) => {
                treeNodesObj[treeNode.id] = {
                    id: treeNode.id,
                    value: treeNode.value,
                    leftId: treeNode.leftId,
                    rightId: treeNode.rightId
                }
            })

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
                            endInsert={endInsert}
                            setEndInsert={setEndInsert}
                        />
                    </div>
                    <div className='leaves-container'>
                        <Leaf
                            id={rootData.root.id}
                            node={rootData.root}
                            position={{ x: 48, y: 30 }}
                            tree={treeState}
                            level={0}
                            leftChild={false}
                            beginInsert={beginInsert}
                            setBeginInsert={setBeginInsert}
                            endInsert={endInsert}
                            setEndInsert={setEndInsert}
                            traversedNodeIds={traversedNodeIds}
                            setTraversedNodeIds={setTraversedNodeIds}
                            numberOfNodes={numberOfNodes}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Tree