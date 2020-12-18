import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode, TreeObject } from './types'
import { GET_ROOT, GET_TREE } from './queries'
import InsertForm from './InsertForm'


type Props = {
    numberOfNodes: number;
    setNumberOfNodes: Function;
    treeId: string;
}

function countTreeLevels(tree: TreeObject, rootId: string): number {
    let maxLevel: number = 0
    function traverse(node: TreeNode, level: number = 0): void {
        maxLevel = Math.max(level, maxLevel)
        if (node.leftId) {
            traverse(tree[node.leftId], level + 1)
        }
        if (node.rightId) {
            traverse(tree[node.rightId], level + 1)
        }
    }
    traverse(tree[rootId])
    return maxLevel
}

const Tree: React.FC<Props> = ({ numberOfNodes, setNumberOfNodes, treeId }) => {


    const { data: treeNodesData } = useQuery(GET_TREE, {
        variables: {
            id: treeId
        }
    })
    const [treeState, setTreeState] = useState({})
    const [rootId, setRootId] = useState('')
    const [levelsOfTree, setLevelsOfTree] = useState(-1)
    const [traversedNodeIds, setTraversedNodeIds] = useState([])
    const [beginInsert, setBeginInsert] = useState(false)
    const [animationOn, setAnimationOn] = useState(true)

    useEffect(() => {

        if (treeNodesData) {

            // Object of TreeNodes
            const treeNodesObj: TreeObject = {}

            // This loop converts the tree from an array to a nested object for constant time lookup of nodes
            treeNodesData.tree.nodes.forEach((treeNode: TreeNode) => {
                treeNodesObj[treeNode.id] = {
                    id: treeNode.id,
                    value: treeNode.value,
                    leftId: treeNode.leftId,
                    rightId: treeNode.rightId
                }
            })

            // Store the nested object in the state so this and other components have access to it
            setTreeState(treeNodesObj)

            setRootId(treeNodesData.tree.root[0].id)

            // Need number of nodes to keep track of whether the tree is full or not
            setNumberOfNodes(treeNodesData.tree.nodes.length)
        }


    }, [treeNodesData])

    useEffect(() => {
        if (Object.keys(treeState).length && rootId) {
            setLevelsOfTree(countTreeLevels(treeState, rootId))
        }
    }, [treeState, rootId])

    return (
        <>
            {(treeNodesData && levelsOfTree > -1) &&
                <>
                    <div className='form-container'>
                        <InsertForm
                            root={treeNodesData.tree.root[0]}
                            tree={treeState}
                            numberOfNodes={numberOfNodes}
                            traversedNodeIds={traversedNodeIds}
                            setTraversedNodeIds={setTraversedNodeIds}
                            beginInsert={beginInsert}
                            setBeginInsert={setBeginInsert}
                            treeId={treeId}
                            setAnimationOn={setAnimationOn}
                        />
                    </div>
                    <div className='leaves-container'>
                        <Leaf
                            id={treeNodesData.tree.root[0].id}
                            node={treeNodesData.tree.root[0]}
                            position={{ x: 48, y: 30 }}
                            tree={treeState}
                            levelsOfTree={levelsOfTree}
                            level={0}
                            beginInsert={beginInsert}
                            setBeginInsert={setBeginInsert}
                            numberOfNodes={numberOfNodes}
                            animationOn={animationOn}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Tree