import React, { useState, useEffect, useContext } from 'react'
import { useGesture } from 'react-with-gesture'
import Context from './Context'


const ControlArea = () => {

    const {
        nodeOffset,
        setNodeOffset,
        previousNodeOffset,
        setPreviousNodeOffset,
        showPreorder,
        showInorder,
        showPostorder,
        allowInteraction,
        beginInsert
    } = useContext(Context)

    // const [currentNodeOffset, setCurrentNodeOffset] = useState(0)
    const [up, setUp] = useState(false)
    const [bind, { delta }] = useGesture({
        onUp: () => {
            setUp(true)
        }
    })

    useEffect(() => {

        if (showPreorder || showInorder || showPostorder || !allowInteraction || beginInsert) {
            return
        }

        if (previousNodeOffset + delta[1] <= 0) {
            setNodeOffset(previousNodeOffset + delta[1])
        }

    }, [delta])

    useEffect(() => {
        if (up) {
            setPreviousNodeOffset(nodeOffset)
            setUp(false)
        }
    }, [up])


    return (
        <div {...bind()} className='control-area' />

    )
}

export default ControlArea