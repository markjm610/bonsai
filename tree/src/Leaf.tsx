import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'
import { CLEAR_TREE, GET_TREE } from './queries'

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
    animationOn: boolean;
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
    animationOn,
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
        setReadyToClearTree,
        showInorder,
        inorder,
        showPostorder,
        postorder
    } = useContext(Context)

    const [clearTree, { data }] = useMutation(CLEAR_TREE)


    function determineOpacity() {
        return (node && node.value) === -1 ? 0 : 1
    }

    function determinePosition(): any {
        if (animationOn) {
            return {
                top: level === 0 ? `${position.y}vh` : '0vh',
                left: level === 0 ? `${position.x}vw` : '0vw',
                opacity: level === 0 ? 1 : 0,
            }
        }

        if (flattened) {
            return {
                top: level === 0 ? `${position.y}vh` : '0vh',
                left: `${position.x}vw`,
                opacity: determineOpacity(),
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

            if (flattened) {
                await next({
                    top: level === 0 ? `${position.y}vh` : '0vh',
                    left: `${position.x}vw`,
                })
            } else if (showPreorder) {

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
                // } else if (startFromRoot) {
                //     if (level === 0) {
                //         await next({
                //             top: `${position.y}vh`,
                //             left: `${position.x}vw`,
                //             opacity: 1,
                //         })
                //     } else {
                //         await next({
                //             top: `0vh`,
                //             left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x}vw` : `${-10 + -(25 - level * 10) + position.x}vw`,
                //             opacity: 0,
                //         })

                //     }
                //     setReadyToClearTree(true)
                //     // clearTree({
                //     //     variables: { id: treeId },
                //     //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
                //     // })
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

    if (node && node.value !== -1) {

        return (

            <animated.div
                id={id}
                className={numberOfNodes !== 15 ? `leaf-${level}` : 'leaf-complete'}
                style={style}
            >
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
                                animationOn={animationOn}
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
                            animationOn={animationOn}
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
                                animationOn={animationOn}
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
                            animationOn={animationOn}
                            setAllowInteraction={setAllowInteraction}
                            isLeftChild={false}
                            parentId={id}
                            treeId={treeId}
                        />
                        }
                    </>
                }
            </animated.div >
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