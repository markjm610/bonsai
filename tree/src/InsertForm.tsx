import React, { useState } from 'react'


const InsertForm: React.FC = () => {

    const [value, setValue] = useState('')

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {

    }

    return (
        <form>
            <label>Enter number to add to tree:</label>
            <input onChange={handleInputChange} value={value} />
            <button></button>
        </form>
    )
}

export default InsertForm