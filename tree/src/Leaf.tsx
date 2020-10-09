import React from 'react'
import { Position, TreeNode } from './types'

type Props = {
    position: Position;
    node: TreeNode;
    tree: any;
    level: number;
}

const Leaf: React.FC<Props> = ({ position, node, tree, level }) => {

    return (
        <div className='leaf' style={{
            top: `${position.y}vh`,
            left: `${position.x}vw`,
        }}>
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
    )
}

export default Leaf