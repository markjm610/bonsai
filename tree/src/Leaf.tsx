import React, { useEffect, useContext } from 'react'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'

type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    tree: TreeObject;
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
    level,
    beginInsert,
    setBeginInsert,
    numberOfNodes,
    animationOn
}) => {

    const { flattened } = useContext(Context)

    let springObj;
    if (level === 0) {
        springObj = {
            to: {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 1,
            },
            from: {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 0.5
            }
        }
    } else {
        springObj = {
            to: {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 1,
            },
            from: {
                top: `${0}vh`,
                left: `${0}vw`,
                opacity: 0.5
            },
        }
    }

    const style = useSpring(springObj)

    // let flattenedSpringObj;

    // if (level === 0) {
    //     flattenedSpringObj = {
    //         from: {
    //             top: `${position.y}vh`,
    //             left: `${position.x}vw`
    //         },
    //         to: {
    //             top: `${position.y}vh`,
    //             left: `${position.x}vw`
    //         }
    //     }
    // } else {
    //     flattenedSpringObj = {
    //         from: {
    //             top: `${position.y}vh`,
    //             left: `${position.x}vw`
    //         },
    //         to: {
    //             top: '0vh',
    //             left: `${position.x}vw`
    //         }
    //     }
    // }
    let flattenedStyle = useSpring({
        from: {
            top: `${position.y}vh`,
            left: `${position.x}vw`
        },
        to: async (next: Function) => {
            if (flattened) {
                if (level === 0) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`
                    })
                } else {
                    await next({
                        top: '0vh',
                        left: `${position.x}vw`
                    })
                }
            } else {
                await next({
                    top: `${position.y}vh`,
                    left: `${position.x}vw`
                })
            }
        }
    })
    // to: async (next: Function) => {
    //     if (flattened) {
    //         await next({
    //             top: '0vh',
    //             left: `${position.x}vw`
    //         })
    //     }
    // }
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
                style={
                    flattened ? flattenedStyle : {
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                    }
                }
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
                className='leaf-complete'
                style={{
                    top: `${position.y}vh`,
                    left: `${position.x}vw`,
                    opacity: 0
                }}
            >
            </animated.div>
        )
    }
}

export default Leaf