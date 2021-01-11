import React, { memo, useContext } from 'react';
import Context from './Context';
import Leaf from './Leaf';
import LeafGhostImage from './LeafGhostImage';
import { Position, TreeNode } from './types';
import { determineClassName } from './utils'


// const styles = {
//     display: 'inline-block',
//     transform: 'rotate(-7deg)',
//     WebkitTransform: 'rotate(-7deg)',
// };
// memo

const BarDragPreview: React.FC = () => {

    const { barPosition, showPreorder, showInorder, showPostorder } = useContext(Context)

    return (
        <div
            className={determineClassName('buttons-container', barPosition)}
            style={{
                backgroundColor: 'burlywood'
            }}
        >
            <button className='start-over-button'>Start From Root Only</button>
            <button className='start-over-button'>{!showPreorder ? 'Show Preorder' : 'Back to Tree'}</button>
            <button className='start-over-button'>{!showInorder ? 'Show Inorder' : 'Back to Tree'}</button>
            <button className='start-over-button'>{!showPostorder ? 'Show Postorder' : 'Back to Tree'}</button>
        </div>
    )
};

export default BarDragPreview