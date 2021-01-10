import React, { useState, useContext, useEffect } from 'react'
import Context from './Context'

function determineClassName(location: string): string {
    if (location === 'left') {
        return 'drop-zone-left'
    } else {
        return 'drop-zone-right'
    }
}

type Props = {
    location: string;
}

const BarDropZone: React.FC<Props> = ({ location }) => {

    return (
        <div className={determineClassName(location)}>{location}</div>
    )
}

export default BarDropZone