import React, { useState, useEffect, useContext } from 'react'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'
import { setSyntheticTrailingComments } from 'typescript'

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
    animationOn
}) => {

    const {
        flattened,
        startLevel2,
        setStartLevel2,
        startLevel3,
        setStartLevel3,
        allowInteraction,
        setAllowInteraction
    } = useContext(Context)

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
        if (!flattened) {
            return {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: determineOpacity(),
            }
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
            } else {
                if (level === 0) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })

                }
                if (level === 1) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel2(true)
                } else if (level === 2 && startLevel2) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel3(true)
                } else if (level === 3 && startLevel3) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
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