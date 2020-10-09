import React, { useEffect } from 'react'
import { nodeModuleNameResolver } from 'typescript'
import { Position } from './types'

type Props = {
    position: Position;
    node: any;
    tree: any;
}

const Leaf: React.FC<Props> = ({ position, node, tree }) => {

    return (
        <div className='leaf' style={{ top: position.y, left: position.x }}>
            {node &&
                <>
                    {node.value}
                    {node.leftId && <Leaf position={{ x: -100, y: 50 }} node={tree[node.leftId]} tree={tree} />}
                    {node.rightId && <Leaf position={{ x: 100, y: 50 }} node={tree[node.rightId]} tree={tree} />}
                </>
            }
        </div>
    )
}

export default Leaf