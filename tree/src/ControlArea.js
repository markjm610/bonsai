import React, { useEffect, useContext } from 'react'
import { useGesture } from 'react-with-gesture'
import Context from './Context'


const ControlArea = () => {

    const { setNodeOffset } = useContext(Context)

    const [bind, { delta }] = useGesture()

    useEffect(() => {
        setNodeOffset(delta[1])
    }, [delta])

    return (
        <div {...bind()} className='control-area' />

    )
}

export default ControlArea