import React, { useEffect } from 'react'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'

type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    tree: TreeObject;
    level: number;
    leftChild: boolean;
    beginInsert: boolean;
    setBeginInsert: Function;
    endInsert: boolean;
    setEndInsert: Function;
    traversedNodeIds: string[];
    setTraversedNodeIds: Function;
    numberOfNodes: number;
}


const Leaf: React.FC<Props> = ({
    id,
    position,
    node,
    tree,
    level,
    leftChild,
    beginInsert,
    setBeginInsert,
    endInsert,
    setEndInsert,
    traversedNodeIds,
    setTraversedNodeIds,
    numberOfNodes,
}) => {


    let springObj;
    if (level === 0) {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 0.5
            }
        }
    } else if (leftChild) {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${0}vh`,
                left: `${0}vw`,
                opacity: 0.5
            },
        }
    } else {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${0}vh`,
                left: `${0}vw`,
                opacity: 0.5
            },
        }
    }

    const style = useSpring(springObj)

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
                style={!beginInsert ? style : {
                    top: `${position.y}vh`,
                    left: `${position.x}vw`,
                }}
            >
                { node &&
                    <>
                        {node.value}
                        {node.leftId ?
                            <Leaf
                                id={node.leftId}
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={tree[node.leftId]}
                                tree={tree}
                                level={level + 1}
                                leftChild={true}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            /> :
                            <Leaf
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
                                leftChild={true}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            />
                        }
                        {node.rightId ?
                            <Leaf
                                id={node.rightId}
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={tree[node.rightId]}
                                tree={tree}
                                level={level + 1}
                                leftChild={false}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            />
                            :
                            <Leaf
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
                                leftChild={false}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
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