import React, { useState, useRef } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper: React.FC = () => {

    const [flattened, setFlattened] = useState(false)

    return (
        <Context.Provider value={{
            flattened, setFlattened
        }}>
            <App />
        </Context.Provider>
    )
}

export default ContextWrapper;