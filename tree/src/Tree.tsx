import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from '@apollo/client'
import Leaf from './Leaf'
import { TreeNode, TreeObject } from './types'
import { GET_ROOT, GET_TREE } from './queries'
import InsertForm from './InsertForm'
import { countTreeLevels } from './utils'
import Context from './Context'
import CustomDragLayer from './CustomDragLayer'

type Props = {
    treeId: string;
}

const Tree: React.FC<Props> = ({ treeId }) => {

    const { rootId, setRootId, treeState, setTreeState, setNumberOfNodes } = useContext(Context)

    const { data: treeNodesData } = useQuery(GET_TREE, {
        variables: {
            id: treeId
        }
    })
    // const [treeState, setTreeState] = useState({})
    // const [rootId, setRootId] = useState('')
    const [levelsOfTree, setLevelsOfTree] = useState(-1)
    const [traversedNodeIds, setTraversedNodeIds] = useState([])
    // const [beginInsert, setBeginInsert] = useState(false)
    const [loadingAnimationOn, setLoadingAnimationOn] = useState(true)

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
                            traversedNodeIds={traversedNodeIds}
                            setTraversedNodeIds={setTraversedNodeIds}
                            treeId={treeId}
                            setLoadingAnimationOn={setLoadingAnimationOn}
                        />
                    </div>
                    <div className='leaves-container'>
                        <Leaf
                            id={treeNodesData.tree.root[0].id}
                            node={treeState[rootId]}
                            position={{ x: 48, y: 30 }}
                            levelsOfTree={levelsOfTree}
                            level={0}
                            loadingAnimationOn={loadingAnimationOn}
                            isLeftChild={null}
                            parentId={null}
                            treeId={treeId}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Tree