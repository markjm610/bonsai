import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode } from './types'
import InsertForm from './InsertForm'


const GET_ROOT = gql`
    {
        root {
            id
            value
            leftId
            rightId
        }
    }
`

const GET_TREENODES = gql`
    {
        treeNodes {
            id
            value
            leftId
            rightId
        }
    }
`

const Tree: React.FC = () => {
    const { data: rootData } = useQuery(GET_ROOT);
    const { data: treeNodesData } = useQuery(GET_TREENODES)
    const [treeState, setTreeState] = useState({})


    useEffect(() => {


        // Recursion: Iterate over each object in array from database, make left and right equal to 
        // object found by leftId and object found by rightId. Might require an extra iteration to set
        // up object of objects for constant time lookup unless graphql can give you a nested object instead of 
        // array of objects

        // Request for each node: get root, if left get left and add left to nested obj, if right get right
        // and add right to nested obj, keep going until null, then use final nested obj to display 
        // nodes

        // Might as well just do array method instead of doing a request over and over

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
                    <InsertForm root={rootData.root} tree={treeState} />
                    <Leaf node={rootData.root} position={{ x: 500, y: 0 }} tree={treeState} />
                </>
            }
        </>
    )
}

export default Tree