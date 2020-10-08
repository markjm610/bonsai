import React from 'react'

type Props = {
    value: number;
}

const Leaf: React.FC<Props> = ({ value }) => {
    return (
        <div className='leaf'>{value}</div>
    )
}

export default Leaf