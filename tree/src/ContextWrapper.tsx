import React, { useState, useRef } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper: React.FC = () => {

    const [flattened, setFlattened] = useState(false)
    const [test, setTest] = useState(false)
    return (
        <Context.Provider value={{
            flattened, setFlattened,
            test, setTest
        }}>
            <App />
        </Context.Provider>
    )
}

export default ContextWrapper;