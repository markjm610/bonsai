import React, { useState, useRef } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper: React.FC = () => {

    const [startLevel2, setStartLevel2] = useState(false)
    const [startLevel3, setStartLevel3] = useState(false)
    // const [allowInteraction, setAllowInteraction] = useState(false)
    const [treeState, setTreeState] = useState({})
    const [rootId, setRootId] = useState('')
    const [preorder, setPreorder] = useState({})
    const [inorder, setInorder] = useState({})
    const [postorder, setPostorder] = useState({})
    const [showPreorder, setShowPreorder] = useState(false)
    const [showInorder, setShowInorder] = useState(false)
    const [showPostorder, setShowPostorder] = useState(false)
    const [startFromRoot, setStartFromRoot] = useState(false)
    const [readyToClearTree, setReadyToClearTree] = useState(false)
    const [nodeToDrag, setNodeToDrag] = useState({})
    const [hideDeletedNodes, setHideDeletedNodes] = useState(new Set())

    return (
        <Context.Provider value={{
            startLevel2, setStartLevel2,
            startLevel3, setStartLevel3,
            // allowInteraction, setAllowInteraction
            rootId, setRootId,
            treeState, setTreeState,
            preorder, setPreorder,
            showPreorder, setShowPreorder,
            startFromRoot, setStartFromRoot,
            readyToClearTree, setReadyToClearTree,
            showInorder, setShowInorder,
            inorder, setInorder,
            showPostorder, setShowPostorder,
            postorder, setPostorder,
            nodeToDrag, setNodeToDrag,
            hideDeletedNodes, setHideDeletedNodes
        }}>
            <App />
        </Context.Provider>
    )
}

export default ContextWrapper;