import React, { useState, useEffect, useContext } from 'react'
import { useGesture } from 'react-with-gesture'
import Context from './Context'


const ControlArea = () => {

    const { nodeOffset, setNodeOffset, previousNodeOffset, setPreviousNodeOffset } = useContext(Context)

    // const [currentNodeOffset, setCurrentNodeOffset] = useState(0)
    const [up, setUp] = useState(false)
    const [bind, { delta }] = useGesture({
        onUp: () => {
            // console.log(currentNodeOffset)
            setUp(true)
            // setPreviousNodeOffset(currentNodeOffset)
            // console.log(delta[1])
        }
    })

    useEffect(() => {
        // if (delta[1] <= 0) {
        // setCurrentNodeOffset(delta[1])
        if (previousNodeOffset + delta[1] <= 0) {
            setNodeOffset(previousNodeOffset + delta[1])
        }

        // }
    }, [delta])

    useEffect(() => {
        if (up) {
            setPreviousNodeOffset(nodeOffset)
            setUp(false)
        }
    }, [up])

    // const handleMouseUp = () => {
    //     setPreviousNodeOffset(delta[1])
    // }

    return (
        <div {...bind()} className='control-area' />

    )
}

export default ControlArea