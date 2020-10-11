import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_TREE_NODE, GET_TREENODES } from './queries'
import { useSpring, animated } from 'react-spring'

type Props = {
    value: string;
    traversedNodeIds: any;
    setTraversedNodeIds: Function;
    storedParentId: string;
    isStoredLeftChild: boolean;
}

const FakeNode: React.FC<Props> = ({
    value,
    traversedNodeIds,
    setTraversedNodeIds,
    storedParentId,
    isStoredLeftChild,
}) => {

    const [addTreeNode, { data }] = useMutation(ADD_TREE_NODE)
    const [animationDone, setAnimationDone] = useState(false)

    const inputElement = document.querySelector('.value-input')
    const inputElementLeft = inputElement?.getBoundingClientRect().left
    const inputElementTop = inputElement?.getBoundingClientRect().top

    const newNodeStyle = useSpring({

        from: { top: inputElementTop, left: inputElementLeft, position: 'fixed', backgroundColor: 'lightgreen', opacity: 1 },
        to: async (next: Function) => {

            if (traversedNodeIds.length) {


                let i = 0

                while (i < traversedNodeIds.length) {


                    const nodeRef = document.getElementById(traversedNodeIds[i])
                    const nodeLocation = nodeRef?.getBoundingClientRect()
                    if (!nodeLocation) {
                        return
                    }
                    if (!inputElementLeft) {
                        return
                    }
                    if (!inputElementTop) {
                        return
                    }

                    if (i === 0) {
                        await next({
                            top: nodeLocation.top,
                            left: nodeLocation.left,
                            backgroundColor: 'lightgreen'
                        })
                    } else if (i === 1) {
                        await next({
                            top: nodeLocation.top,
                            left: nodeLocation.left,
                            backgroundColor: 'yellow'
                        })
                    } else if (i === 2) {
                        await next({
                            top: nodeLocation.top,
                            left: nodeLocation.left,
                            backgroundColor: 'orange'
                        })
                    } else {
                        await next({
                            top: nodeLocation.top,
                            left: nodeLocation.left,
                            backgroundColor: 'rgb(255, 69, 0)'
                        })
                    }

                    i++

                }

                setAnimationDone(true)
                setTraversedNodeIds([])

            }

        }


    })

    useEffect(() => {
        if (animationDone) {

            addTreeNode({
                variables: {
                    value: parseInt(value),
                    root: false,
                    parentId: storedParentId,
                    isLeftChild: isStoredLeftChild
                },
                refetchQueries: [{ query: GET_TREENODES }]
            })

        }

    }, [animationDone])

    return (
        <animated.div
            className='fake-node'
            style={newNodeStyle}
        >
            {value}
        </animated.div>
    )
}

export default FakeNode