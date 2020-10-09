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
        <div className='leaf' style={{ top: position.y, left: position.x }}>
            {node &&
                <>
                    {node.value}
                    {node.leftId && <Leaf position={{ x: -120, y: 50 }} node={tree[node.leftId]} tree={tree} />}
                    {node.rightId && <Leaf position={{ x: 120, y: 50 }} node={tree[node.rightId]} tree={tree} />}
                </>
            }
            {/* {node.value}
            {node.leftId !== null && <Leaf position={{ x: -100, y: 50 }} node={tree[node.leftId]} tree={tree} />}
            {node.rightId !== null && <Leaf position={{ x: 100, y: 50 }} node={tree[node.rightId]} tree={tree} />} */}
        </div>
    )
}

export default Leaf