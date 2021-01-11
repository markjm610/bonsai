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

    const { barPosition, setBarPosition, allowInteraction, beginInsert } = useContext(Context)

    const switchPosition = (item: any): void => {
        setBarPosition(location)
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'bar',
        // drop: (item) => {
        //     // handleDrop(item);
        // },
        hover: (item) => {
            if (barPosition === location) {
                return
            }
            switchPosition(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <div className={determineClassName(location)} ref={(!allowInteraction || beginInsert) ? null : drop} />
    )
}

export default BarDropZone