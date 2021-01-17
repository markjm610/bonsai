import React, { useState, useContext, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'


const Instructions: React.FC = () => {

    const [show, setShow] = useState(false)
    const [showText, setShowText] = useState(false)
    const [showIcon, setShowIcon] = useState(true)
    // const clickOutsideRef = useOnclickOutside(() => {

    // })

    const style = useSpring({
        from: {
            height: '75px',
            width: '110px',
            position: 'fixed',
            left: '0vw',
            top: '0vh',
            zIndex: 50,
            backgroundColor: '#f5f5f5', // whitesmoke,
            borderRadius: '0% 0% 5% 0%',
            boxShadow: '2px 2px 2px gray',
        },
        to: async (next: Function) => {
            if (show) {
                setShowIcon(false)
                await next({
                    height: '280px',
                    width: '420px',
                    left: '0vw',
                    top: '0vh',
                    zIndex: 50,
                    position: 'fixed',
                    backgroundColor: '#f5f5f5', // whitesmoke,
                    borderRadius: '0% 0% 5% 0%',
                    boxShadow: '2px 2px 2px gray',
                })
                setShowText(true)
            } else {
                setShowText(false)
                await next({
                    height: '75px',
                    width: '110px',
                    position: 'fixed',
                    left: '0vw',
                    top: '0vh',
                    zIndex: 50,
                    backgroundColor: '#f5f5f5', // whitesmoke,
                    borderRadius: '0% 0% 5% 0%',
                    boxShadow: '2px 2px 2px gray',
                })
                setShowIcon(true)
            }

        }
    })


    return (
        <animated.div className='instructions-container' style={style} onClick={() => setShow(!show)}>
            {showIcon
                && <div className='instructions-icon'><div>Click me for more information!</div></div>}
            {showText
                && <>
                    <h2 className='instruction-heading'>Some things you can do:</h2>
                    <div className='instruction'>- Click a tree node to edit the number inside.</div>
                    <div className='instruction'>- Drag nodes to the trash can to delete that node and its children.</div>
                    <div className='instruction'>- The root node cannot be deleted, but it can be edited.</div>
                    <div className='instruction'>- Click and drag upwards to compress the tree. Click and drag downwards to expand the tree.</div>
                </>
            }
        </animated.div >
    )
}

export default Instructions