import React, { useContext } from 'react'
import Context from './Context'
import { Position, TreeNode } from './types';

type Props = {
    id: string;
    node: any;
    level: number;
    position: Position;
}

const LeafGhostImage: React.FC<Props> = ({ id, node, level, position }) => {

    const { treeState } = useContext(Context)
    // console.log(nodeToDrag)
    return (
        <div style={{
            top: `${position.y}vh`,
            left: `${position.x}vw`,
        }} className={`leaf-${level}`}>
            {node.value}
            {node.leftId && <LeafGhostImage id={node.leftId} node={treeState[node.leftId]} level={level + 1} position={{ x: -25 + level * 10, y: 10 }} />}
            {node.rightId && <LeafGhostImage id={node.rightId} node={treeState[node.rightId]} level={level + 1} position={{ x: 25 - level * 10, y: 10 }} />}
        </div>
    )
}

export default LeafGhostImage