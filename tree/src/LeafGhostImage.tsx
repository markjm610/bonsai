import React, { useContext } from 'react'
import Context from './Context'
import { Position, TreeNode } from './types';
import { determineOffset } from './utils'

type Props = {
    id: string;
    node: any;
    level: number;
    position: Position;
}

const LeafGhostImage: React.FC<Props> = ({ id, node, level, position }) => {

    const { treeState, numberOfNodes, nodeOffset } = useContext(Context)
    // console.log(nodeToDrag)
    return (
        <div style={{
            top: `${position.y}vh`,
            left: `${position.x}vw`,
        }} className={numberOfNodes === 15 ? 'leaf-complete' : `leaf-${level}`}>
            {node.value}
            {node.leftId && <LeafGhostImage
                id={node.leftId}
                node={treeState[node.leftId]}
                level={level + 1}
                position={{ x: Math.min(-nodeOffset / 10, determineOffset(level)) - 25 + level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }} />}
            {node.rightId && <LeafGhostImage
                id={node.rightId}
                node={treeState[node.rightId]}
                level={level + 1}
                position={{ x: Math.max(nodeOffset / 10, -determineOffset(level)) + 25 - level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }} />}
        </div>
    )
}

export default LeafGhostImage