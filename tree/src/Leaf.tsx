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
            top: position.y,
            left: `${position.x}vw`,
        }}>
            {node &&
                <>
                    {node.value}
                    {node.leftId &&
                        <Leaf
                            position={{ x: -25 + level * 10, y: 100 }}
                            node={tree[node.leftId]}
                            tree={tree}
                            level={level + 1}
                        />}
                    {node.rightId &&
                        <Leaf
                            position={{ x: 25 - level * 10, y: 100 }}
                            node={tree[node.rightId]}
                            tree={tree}
                            level={level + 1}
                        />}
                </>
            }
            {/* {node.value}
            {node.leftId !== null && <Leaf position={{ x: -100, y: 50 }} node={tree[node.leftId]} tree={tree} />}
            {node.rightId !== null && <Leaf position={{ x: 100, y: 50 }} node={tree[node.rightId]} tree={tree} />} */}
        </div>
    )
}

export default Leaf