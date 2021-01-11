import React, { useState, useContext, useEffect } from 'react'
import Context from './Context'
import { useDrop } from 'react-dnd';

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

    const [{ isOver }, drop] = useDrop({
        accept: 'bar',
        // drop: (item) => {
        //     // handleDrop(item);
        // },
        hover: (item) => {
            // handleHover(item)
            console.log(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <div className={determineClassName(location)} ref={drop}>{location}</div>
    )
}

export default BarDropZone