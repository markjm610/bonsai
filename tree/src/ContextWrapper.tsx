import React, { useState, useRef } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper: React.FC = () => {

    const [flattened, setFlattened] = useState(false)
    const [startLevel2, setStartLevel2] = useState(false)
    const [startLevel3, setStartLevel3] = useState(false)
    // const [allowInteraction, setAllowInteraction] = useState(false)

    return (
        <Context.Provider value={{
            flattened, setFlattened,
            startLevel2, setStartLevel2,
            startLevel3, setStartLevel3,
            // allowInteraction, setAllowInteraction
        }}>
            <App />
        </Context.Provider>
    )
}

export default ContextWrapper;