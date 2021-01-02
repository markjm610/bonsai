import React, { useEffect, useContext } from 'react'
import { useGesture } from 'react-with-gesture'
import Context from './Context'


const ControlArea = () => {

    const { nodeOffset, setNodeOffset, previousNodeOffset, setPreviousNodeOffset } = useContext(Context)

    const [bind, { delta }] = useGesture()

    useEffect(() => {
        if (delta[1] <= 0) {
            setNodeOffset(delta[1])
        }
    }, [delta])

    // const handleMouseUp = () => {
    //     setPreviousNodeOffset(delta[1])
    // }

    return (
        <div {...bind()} className='control-area' />

    )
}

export default ControlArea