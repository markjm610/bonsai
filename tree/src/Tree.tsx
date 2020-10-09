import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode } from './types'
import { GET_ROOT, GET_TREENODES } from './queries'
import InsertForm from './InsertForm'


const Tree: React.FC = () => {
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

        }


    }, [rootData, treeNodesData])

    return (
        <>
            {(rootData && treeNodesData) &&
                <>
                    <InsertForm
                        root={rootData.root}
                        tree={treeState}
                        setTreeState={setTreeState}
                    />
                    <Leaf
                        node={rootData.root}
                        position={{ x: 500, y: 0 }}
                        tree={treeState}
                    />
                </>
            }
        </>
    )
}

export default Tree