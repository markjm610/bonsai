import React, { useEffect } from 'react'
import { Position, TreeNode } from './types'
// import { CSSTransition } from 'react-transition-group'
// import { Keyframes, animated, config } from 'react-spring/renderprops'
import { useTransition, useSpring, animated } from 'react-spring'
import { setSyntheticLeadingComments } from 'typescript'

type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    tree: any;
    level: number;
    leftChild: boolean;
    beginInsert: boolean;
    setBeginInsert: Function;
    endInsert: boolean;
    setEndInsert: Function;
    traversedNodeIds: any;
    setTraversedNodeIds: Function;
    numberOfNodes: number;
}



const Leaf: React.FC<Props> = ({
    id,
    position,
    node,
    tree,
    level,
    leftChild,
    beginInsert,
    setBeginInsert,
    endInsert,
    setEndInsert,
    traversedNodeIds,
    setTraversedNodeIds,
    numberOfNodes
}) => {

    let springObj;
    if (level === 0) {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${position.y}vh`,
                left: `${position.x}vw`,
                opacity: 0.5
            }
        }
    } else if (leftChild) {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${0}vh`,
                left: `${0}vw`,
                opacity: 0.5
            },
        }
    } else {
        springObj = {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: 1,
            from: {
                top: `${0}vh`,
                left: `${0}vw`,
                opacity: 0.5
            },
        }
    }

    const style = useSpring(springObj)

    // const addStyle = useSpring({
    //     // position: 'absolute',
    //     // backgroundColor: 'lightgreen',
    //     // from: { top: 0 },
    //     // to: { top: 50 }
    //     from: { top: 0, left: 0, position: 'absolute', backgroundColor: 'lightgreen' },
    //     to: async (next: Function) => {
    //         if (beginInsert && traversedNodeIds.length) {
    //             // console.log(traversedNodeIds)
    //             // traversedNodeIds.forEach(async (id: string) => {
    //             //     console.log(id)
    //             //     const nodeRef = document.getElementById(id)
    //             //     const nodeLocation = nodeRef?.getBoundingClientRect()
    //             //     if (!nodeLocation) {
    //             //         return
    //             //     }
    //             //     await next({ top: nodeLocation.top, left: nodeLocation.left })
    //             //     console.log('done')
    //             // })
    //             console.log('start')
    //             let i = 0

    //             while (i < traversedNodeIds.length) {
    //                 console.log('i < ')
    //                 // if (i === traversedNodeIds.length) {
    //                 //     console.log('asd')
    //                 //     const previousNode = document.getElementById(traversedNodeIds[i - 1])?.getBoundingClientRect()
    //                 //     if (!previousNode) {
    //                 //         return
    //                 //     }
    //                 //     if (value > tree[traversedNodeIds[i - 1]].value) {
    //                 //         const left = previousNode.left + 100
    //                 //         await next({ top: previousNode.top + 100, left })
    //                 //     }

    //                 // } else {

    //                 const nodeRef = document.getElementById(traversedNodeIds[i])
    //                 const nodeLocation = nodeRef?.getBoundingClientRect()
    //                 if (!nodeLocation) {
    //                     return
    //                 }
    //                 await next({ top: nodeLocation.top, left: nodeLocation.left })


    //                 // }
    //                 i++

    //             }

    //             console.log('done')

    //             // Get rid of blinking thing in input when it gets submitted

    //             // addTreeNode({
    //             //     variables: {
    //             //         value: parseInt(value),
    //             //         root: false,
    //             //         parentId: storedParentId,
    //             //         isLeftChild: isStoredLeftChild
    //             //     },
    //             //     refetchQueries: [{ query: GET_TREENODES }]
    //             // })

    //             setTraversedNodeIds([])

    //         }

    //         // if (endInsert) {
    //         //     setEndInsert(false)
    //         //     await next({ opacity: 0 })
    //         //     await next({ top: 0, left: 0 })
    //         //     await next({ opacity: 1 })
    //         // }

    //     }
    //     // backgroundColor: (decimalError || numberError || !validMove) ? 'red' : 'lightgreen',
    //     // boxShadow: test ? '2px 2px 5px black' : '0px 0px 0px black',
    //     // top: test ? rootTop : 0,
    //     // left: test ? rootLeft : 0

    // })

    useEffect(() => {
        if (beginInsert) {
            setBeginInsert(false)
            setEndInsert(true)
        }
    }, [])

    //    Need to stop empty children from rendering past max level

    if (node && node.value !== -1) {
        return (
            // <CSSTransition
            //     in={true}
            //     timeout={300}
            //     classNames='tree'
            //     appear
            // >

            <animated.div
                id={id}
                className={numberOfNodes !== 15 ? `leaf-${level}` : 'leaf-complete'}

                // style={{
                //     top: `${position.y}vh`,
                //     left: `${position.x}vw`,
                // }}
                style={!beginInsert ? style : {
                    top: `${position.y}vh`,
                    left: `${position.x}vw`,
                }}
            >
                { node &&
                    <>
                        {node.value}
                        {node.leftId ?
                            <Leaf
                                id={node.leftId}
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={tree[node.leftId]}
                                tree={tree}
                                level={level + 1}
                                leftChild={true}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            /> :
                            <Leaf
                                id={`left child of ${node.id}`}
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={{
                                    id: `left child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null
                                }}
                                tree={tree}
                                level={level + 1}
                                leftChild={true}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            />
                        }
                        {node.rightId ?
                            <Leaf
                                id={node.rightId}
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={tree[node.rightId]}
                                tree={tree}
                                level={level + 1}
                                leftChild={false}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            />
                            :
                            <Leaf
                                id={`right child of ${node.id}`}
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={{
                                    id: `right child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null
                                }}
                                tree={tree}
                                level={level + 1}
                                leftChild={false}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                endInsert={endInsert}
                                setEndInsert={setEndInsert}
                                traversedNodeIds={traversedNodeIds}
                                setTraversedNodeIds={setTraversedNodeIds}
                                numberOfNodes={numberOfNodes}
                            />
                        }
                    </>
                }
            </animated.div >


            // </CSSTransition>
        )
    } else {
        return (
            <animated.div
                id={id}
                className='leaf-complete'
                style={{
                    top: `${position.y}vh`,
                    left: `${position.x}vw`,
                    opacity: 0
                }}
            // style={style}
            >
            </animated.div>
        )
    }


}

export default Leaf