import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'
import { DELETE_NODE, GET_TREE } from './queries'
import { useDrag } from 'react-dnd';
import CustomDragLayer from './CustomDragLayer'
import { getEmptyImage } from 'react-dnd-html5-backend';


type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    tree: TreeObject;
    levelsOfTree: number;
    level: number;
    beginInsert: boolean;
    setBeginInsert: Function;
    numberOfNodes: number;
    loadingAnimationOn: boolean;
    setAllowInteraction: Function;
    isLeftChild: boolean | null;
    parentId: string | null;
    treeId: string;
}

const Leaf: React.FC<Props> = ({
    id,
    position,
    node,
    tree,
    levelsOfTree,
    level,
    beginInsert,
    setBeginInsert,
    numberOfNodes,
    loadingAnimationOn,
    setAllowInteraction,
    isLeftChild,
    parentId,
    treeId
}) => {

    const {
        flattened,
        startLevel2,
        setStartLevel2,
        startLevel3,
        setStartLevel3,
        // allowInteraction,
        // setAllowInteraction
        showPreorder,
        preorder,
        startFromRoot,
        setStartFromRoot,
        setReadyToClearTree,
        showInorder,
        inorder,
        showPostorder,
        postorder,
        nodeToDrag,
        setNodeToDrag,
        levelToDrag,
        setLevelToDrag
    } = useContext(Context)

    // const [clearTree, { data }] = useMutation(CLEAR_TREE)
    const [deleteNode, { data }] = useMutation(DELETE_NODE)
    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            type: 'node',
            id,
            parentId,
            treeId,
            isLeftChild
        },
        // begin: () => {

        // },
        // end: (item) => {

        // },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    function determineOpacity() {

        return (node && node.value) === -1 ? 0 : 1
    }

    function determinePosition(): any {
        if (loadingAnimationOn) {
            // Nodes other than root have to start from 0vh, 0vw, and 0 opacity for the loading animation
            if (node.value !== -1) {
                return {
                    top: level === 0 ? `${position.y}vh` : '0vh',
                    left: level === 0 ? `${position.x}vw` : '0vw',
                    opacity: level === 0 ? 1 : 0,
                }
            }
        }

        return {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: determineOpacity(),
        }

    }

    const style = useSpring({
        from: determinePosition(),
        to: async (next: Function) => {

            if (showPreorder) {

                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by preorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (preorder[id].index - preorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (preorder[id].index - preorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            left: `${position.x - Math.floor(numberOfNodes / 2) * 5}vw`
                        })
                    }
                }
            } else if (startFromRoot) {
                // if (level === 0) {

                //     await next({
                //         top: `${position.y}vh`,
                //         left: `${position.x}vw`,
                //         opacity: 1,
                //     })
                // } else {

                //     await next({
                //         top: `0vh`,
                //         left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x}vw` : `${-10 + -(25 - level * 10) + position.x}vw`,
                //         opacity: 0,
                //     })
                // }
                setReadyToClearTree(true)
                // clearTree({
                //     variables: { id: treeId },
                //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
                // })
            } else if (showInorder) {
                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by inorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (inorder[id].index - inorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (inorder[id].index - inorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}` : `0vh`,
                            left: '48vw'
                        })
                    }
                }
            } else if (showPostorder) {

                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by postorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (postorder[id].index - postorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (postorder[id].index - postorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            left: `${position.x + Math.floor(numberOfNodes / 2) * 5}vw`
                        })
                    }
                }

            } else {
                if (level === 0) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })

                    if (levelsOfTree === 0) {
                        setAllowInteraction(true)
                    }
                }
                if (level === 1) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel2(true)
                    if (levelsOfTree === 1) {
                        setAllowInteraction(true)
                    }
                } else if (level === 2 && startLevel2) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel3(true)
                    if (levelsOfTree === 2) {
                        setAllowInteraction(true)
                    }
                } else if (level === 3 && startLevel3) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    if (levelsOfTree === 3) {
                        setAllowInteraction(true)
                    }
                }

            }
        }
    })

    useEffect(() => {
        if (beginInsert) {
            setBeginInsert(false)
        }
    }, [])

    useEffect(() => {
        preview(getEmptyImage());
    }, [])

    const deleteClick = (e: any) => {
        // e.stopPropagation()
        // deleteNode({
        //     variables: { id, parentId, isLeftChild },
        //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        // })
    }

    const handleMouseEnter = () => {
        setNodeToDrag({ ...node, level: level })
    }

    if (node && node.value !== -1) {


        return (
            <>
                <animated.div
                    id={id}
                    className={numberOfNodes !== 15 ? `leaf-${level}` : 'leaf-complete'}
                    style={!isDragging ? style : {
                        opacity: 0,
                    }}
                    ref={drag}
                    onMouseEnter={handleMouseEnter}
                >
                    <CustomDragLayer
                        id={id}
                        node={nodeToDrag}
                        position={{ x: 0, y: 0 }}
                    />
                    {node &&
                        <>
                            {node.value}

                            {node.leftId &&
                                <Leaf
                                    id={node.leftId}
                                    position={{ x: -25 + level * 10, y: 10 }}
                                    node={tree[node.leftId]}
                                    tree={tree}
                                    levelsOfTree={levelsOfTree}
                                    level={level + 1}
                                    beginInsert={beginInsert}
                                    setBeginInsert={setBeginInsert}
                                    numberOfNodes={numberOfNodes}
                                    loadingAnimationOn={loadingAnimationOn}
                                    setAllowInteraction={setAllowInteraction}
                                    isLeftChild={true}
                                    parentId={id}
                                    treeId={treeId}
                                />}
                            {(!node.leftId && level <= 2) && <Leaf
                                id={`left child of ${node.id}`}
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={{
                                    id: `left child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null
                                }}
                                tree={tree}
                                levelsOfTree={levelsOfTree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                numberOfNodes={numberOfNodes}
                                loadingAnimationOn={loadingAnimationOn}
                                setAllowInteraction={setAllowInteraction}
                                isLeftChild={true}
                                parentId={id}
                                treeId={treeId}
                            />
                            }
                            {node.rightId &&
                                <Leaf
                                    id={node.rightId}
                                    position={{ x: 25 - level * 10, y: 10 }}
                                    node={tree[node.rightId]}
                                    tree={tree}
                                    levelsOfTree={levelsOfTree}
                                    level={level + 1}
                                    beginInsert={beginInsert}
                                    setBeginInsert={setBeginInsert}
                                    numberOfNodes={numberOfNodes}
                                    loadingAnimationOn={loadingAnimationOn}
                                    setAllowInteraction={setAllowInteraction}
                                    isLeftChild={false}
                                    parentId={id}
                                    treeId={treeId}
                                />}
                            {(!node.rightId && level <= 2) && <Leaf
                                id={`right child of ${node.id}`}
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={{
                                    id: `right child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null
                                }}
                                tree={tree}
                                levelsOfTree={levelsOfTree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                numberOfNodes={numberOfNodes}
                                loadingAnimationOn={loadingAnimationOn}
                                setAllowInteraction={setAllowInteraction}
                                isLeftChild={false}
                                parentId={id}
                                treeId={treeId}
                            />
                            }

                        </>
                    }
                </animated.div >
                {/* <CustomDragLayer
                    node={node}
                    level={level}
                    position={{ x: 0, y: 0 }}
                /> */}
            </>
        )
    } else {
        return (
            <animated.div
                id={id}
                className='leaf-0'
                style={
                    //     // !flattened
                    //     // ?
                    //     // {
                    //     //     top: `${position.y}vh`,
                    //     //     left: `${position.x}vw`,
                    //     //     opacity: 0
                    //     // }
                    //     // :
                    //     // {
                    //     //     top: `0vh`,
                    //     //     left: `${position.x}vw`,
                    //     //     opacity: 0
                    //     // }
                    determinePosition()
                }
            >
            </animated.div>
        )
    }
}

export default Leaf