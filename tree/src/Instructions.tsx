import React, { useState, useContext, useEffect } from 'react'
import Context from './Context'
import useOnclickOutside from "react-cool-onclickoutside";

const Instructions: React.FC = () => {



    const clickOutsideRef = useOnclickOutside(() => {

    })


    return (
        <div className='instructions-container'>
            <div className='instructions' ref={clickOutsideRef}>
                <h2 className='instruction-heading'>Some other things you can do:</h2>
                <div className='instruction'>- Click a tree node to edit the number inside.</div>
                <div className='instruction'>- Drag nodes to the trash can to delete that node and its children.</div>
                <div className='instruction'>- The root node cannot be deleted, but it can be edited.</div>
                <div className='instruction'>- Click and drag upwards to compress the tree. Click and drag downwards to expand the tree.</div>
            </div>
        </div>
    )
}

export default Instructions