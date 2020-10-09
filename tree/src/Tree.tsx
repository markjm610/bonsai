import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { graphql } from 'react-apollo'
import { idText } from 'typescript'
import Leaf from './Leaf'
import { TreeNode } from './types'


// type LeafData = {
//     id: number;
//     value: number;
//     leftId: number | null;
//     rightId: number | null;
// }

// type TreeData = {
//     [id: string]: LeafData
// }

// type TreeNode = {
//     id: string;
//     value: number;
//     leftId: number | null;
//     rightId: number | null;
// }

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
    // const [treeData, setTreeData] = useState([])
    // type Node = {
    //     next: any;
    //     value: any;
    // }
    // class Node {
    //     value: any;
    //     left: any;
    //     right: any;
    //     constructor(value: any) {
    //         this.value = value;
    //         this.left = null;
    //         this.right = null;
    //     }
    // }

    // const a = new Node(1)
    // const b = new Node(2)
    // const c = new Node(3)
    // const d = new Node(4)
    // const e = new Node(5)
    // a.left = b
    // a.right = c
    // c.right = d
    // d.left = e

    useEffect(() => {

        // get tree data
        // process tree data so treeData in state is obj with keys of leaf IDs and values of leaf objects

        // position: if node is a left child, position x = parent position x - 50
        // if node is right child, position x = parent position x + 50

        // {
        //     [leafId]: {
        //         value: number,
        //         position: {
        //           x: number,
        //           y: number
        //         }
        //         leftId: id or null,
        //         rightId: id or null
        //     },
        //     [leafId]: {
        //         value: number,
        //         position: {
        //           x: number,
        //           y: number
        //         }
        //         leftId: id or null,
        //         rightId: id or null
        //     },
        //     etc
        // }

        // leafArray.map(leaf => {
        //      return <Leaf value={value} position={treeObj[leaf.id].position} />
        // })


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
            {(rootData && treeNodesData) && <Leaf node={rootData.root} position={{ x: 500, y: 0 }} tree={treeState} />}
        </>
    )
}

export default Tree