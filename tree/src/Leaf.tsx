import React from 'react'
import { Position, TreeNode } from './types'
import { CSSTransition } from 'react-transition-group'


type Props = {
    position: Position;
    node: TreeNode;
    tree: any;
    level: number;
}

const Leaf: React.FC<Props> = ({ position, node, tree, level }) => {

    return (
        <CSSTransition
            in={true}
            timeout={300}
            classNames='tree'
            appear
        >
            <div
                className='leaf'
                style={{
                    top: `${position.y}vh`,
                    left: `${position.x}vw`,
                }}
            >
                {node &&
                    <>
                        {node.value}
                        {node.leftId &&
                            <Leaf
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={tree[node.leftId]}
                                tree={tree}
                                level={level + 1}
                            />}
                        {node.rightId &&
                            <Leaf
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={tree[node.rightId]}
                                tree={tree}
                                level={level + 1}
                            />}
                    </>
                }
            </div>
        </CSSTransition>
    )
}

export default Leaf