import React, { memo } from 'react';
import Leaf from './Leaf';
import LeafGhostImage from './LeafGhostImage';

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
};

const NodeDragPreview = memo(() => {

    return (
        <div>
            <LeafGhostImage />
        </div>
    );
});

export default NodeDragPreview