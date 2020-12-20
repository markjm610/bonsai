import React, { useState, useRef } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper: React.FC = () => {

    const [flattened, setFlattened] = useState(false)
    const [startLevel2, setStartLevel2] = useState(false)
    const [startLevel3, setStartLevel3] = useState(false)
    // const [allowInteraction, setAllowInteraction] = useState(false)
    const [treeState, setTreeState] = useState({})
    const [rootId, setRootId] = useState('')
    const [traversalValues, setTraversalValues] = useState([])

    return (
        <Context.Provider value={{
            flattened, setFlattened,
            startLevel2, setStartLevel2,
            startLevel3, setStartLevel3,
            // allowInteraction, setAllowInteraction
            rootId, setRootId,
            treeState, setTreeState,
            traversalValues, setTraversalValues
        }}>
            <App />
        </Context.Provider>
    )
}

export default ContextWrapper;