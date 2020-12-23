import React, { memo, useContext } from 'react';
import Context from './Context';
import Leaf from './Leaf';
import LeafGhostImage from './LeafGhostImage';
import { Position, TreeNode } from './types';

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
};
// memo

type Props = {
    id: string;
    node: any;
    position: Position;
}

const NodeDragPreview: React.FC<Props> = ({ id, node, position }) => {

    const { nodeToDrag } = useContext(Context)

    return (
        <div>
            <LeafGhostImage id={id} node={node} level={node.level} position={position} />
        </div>
    )
};

export default NodeDragPreview