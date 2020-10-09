import React, { useEffect } from 'react'
import { nodeModuleNameResolver } from 'typescript'

type Position = {
    x: number;
    y: number;
}

// type Props = {
//     value: number;
//     position: Position;
//     left: {

//     };
//     right: number;
// }

type Props = {
    // value: any;
    position: any;
    // left: any;
    // right: any;
    node: any;
}

const Leaf: React.FC<Props> = ({ position, node }) => {

    // const position: Position = {
    //     x: parentPosition ? parentPosition.x + 50 : 0,
    //     y: parentPosition ? parentPosition.y + 50 : 0
    // }
    useEffect(() => {
        // get info for node with node.id
        // set state to node info
    }, [])


    return (
        <div className='leaf' style={{ top: position.y, left: position.x }}>
            {node.value}
            {node.left && <Leaf position={{ x: -100, y: 50 }} node={node.left} />}
            {node.right && <Leaf position={{ x: 100, y: 50 }} node={node.right} />}
        </div>
    )
}

export default Leaf