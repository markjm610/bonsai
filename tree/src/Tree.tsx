import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode } from './types'
import { GET_ROOT, GET_TREENODES } from './queries'
import InsertForm from './InsertForm'


type Props = {
    numberOfNodes: number;
    setNumberOfNodes: any;
}

const Tree: React.FC<Props> = ({ numberOfNodes, setNumberOfNodes }) => {
    const { data: rootData } = useQuery(GET_ROOT);
    const { data: treeNodesData } = useQuery(GET_TREENODES)
    const [treeState, setTreeState] = useState({})

    useEffect(() => {


        if (rootData && treeNodesData) {

            // Type?
            const treeNodesObj: any = {}

            treeNodesData.treeNodes.forEach((treeNode: TreeNode) => {
                treeNodesObj[treeNode.id] = {
                    id: treeNode.id,
                    value: treeNode.value,
                    leftId: treeNode.leftId,
                    rightId: treeNode.rightId
                }
            })

            setTreeState(treeNodesObj)
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
                        />
                    </div>
                    <div className='leaves-container'>
                        <Leaf
                            node={rootData.root}
                            position={{ x: 48, y: 15 }}
                            tree={treeState}
                            level={0}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Tree