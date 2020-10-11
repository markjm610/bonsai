import React from 'react'
import { Position, TreeNode } from './types'
// import { CSSTransition } from 'react-transition-group'
// import { Keyframes, animated, config } from 'react-spring/renderprops'
import { useTransition, useSpring, animated } from 'react-spring'
import { setSyntheticLeadingComments } from 'typescript'

type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    tree: any;
    level: number;
    leftChild: boolean;
}



const Leaf: React.FC<Props> = ({ id, position, node, tree, level, leftChild }) => {

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

    //    Need to stop empty children from rendering past max level

    if (node && node.value !== -1) {
        return (
            // <CSSTransition
            //     in={true}
            //     timeout={300}
            //     classNames='tree'
            //     appear
            // >

            <animated.div
                id={id}
                className='leaf'
                // style={{
                //     top: `${position.y}vh`,
                //     left: `${position.x}vw`,
                // }}
                style={style}
            >
                {node &&
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
                            />
                        }
                    </>
                }
            </animated.div>


            // </CSSTransition>
        )
    } else {
        return (<animated.div
            id={id}
            className='leaf'
            style={{
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 0
            }}
        // style={style}
        >
        </animated.div>
        )
    }


}

export default Leaf