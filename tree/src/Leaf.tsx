import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Position, TreeNode, TreeObject } from './types'
import { useSpring, animated } from 'react-spring'
import Context from './Context'
import { EDIT_NODE, GET_TREE } from './queries'
import { useDrag } from 'react-dnd';
import CustomDragLayer from './CustomDragLayer'
import { getEmptyImage } from 'react-dnd-html5-backend';
import useOnclickOutside from "react-cool-onclickoutside";
import { testNewValue } from './utils'


type Props = {
    id: string;
    position: Position;
    node: TreeNode;
    levelsOfTree: number;
    level: number;
    beginInsert: boolean;
    setBeginInsert: Function;
    loadingAnimationOn: boolean;
    allowInteraction: boolean;
    setAllowInteraction: Function;
    isLeftChild: boolean | null;
    parentId: string | null;
    treeId: string;
}

const Leaf: React.FC<Props> = ({
    id,
    position,
    node,
    levelsOfTree,
    level,
    beginInsert,
    setBeginInsert,
    loadingAnimationOn,
    allowInteraction,
    setAllowInteraction,
    isLeftChild,
    parentId,
    treeId
}) => {

    const {
        treeState,
        setTreeState,
        startLevel2,
        setStartLevel2,
        startLevel3,
        setStartLevel3,
        // allowInteraction,
        // setAllowInteraction
        showPreorder,
        preorder,
        startFromRoot,
        setStartFromRoot,
        setReadyToClearTree,
        showInorder,
        inorder,
        showPostorder,
        postorder,
        nodeToDrag,
        setNodeToDrag,
        levelToDrag,
        setLevelToDrag,
        hideDeletedNodes,
        rootId,
        numberOfNodes,
        nodeOffset
    } = useContext(Context)

    const [edit, setEdit] = useState(false)
    const [editValue, setEditValue] = useState(`${node.value}`)
    const [decimalError, setDecimalError] = useState(false)
    const [numberError, setNumberError] = useState(false)
    // const [clearTree, { data }] = useMutation(CLEAR_TREE)
    // const [deleteNode, { data }] = useMutation(DELETE_NODE)
    const [editNode, { data }] = useMutation(EDIT_NODE)

    // const [bind, { delta, down }] = useGesture()

    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            type: 'node',
            id,
            parentId,
            treeId,
            isLeftChild
        },
        // begin: () => {

        // },
        // end: (item) => {

        // },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    function determineOpacity() {

        return (node && node.value) === -1 ? 0 : 1
    }

    function determinePosition(): any {
        if (loadingAnimationOn) {
            // Nodes other than root have to start from 0vh, 0vw, and 0 opacity for the loading animation
            if (node.value !== -1) {
                return {
                    top: level === 0 ? `${position.y}vh` : '0vh',
                    left: level === 0 ? `${position.x}vw` : '0vw',
                    opacity: level === 0 ? 1 : 0,
                }
            }
        }
        // console.log(delta[0])
        return {
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            opacity: determineOpacity(),
        }

    }

    const style = useSpring({
        from: determinePosition(),
        to: async (next: Function) => {

            if (showPreorder) {

                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by preorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (preorder[id].index - preorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (preorder[id].index - preorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            left: `${position.x - Math.floor(numberOfNodes / 2) * 5}vw`
                        })
                    }
                }
            } else if (startFromRoot) {
                // if (level === 0) {

                //     await next({
                //         top: `${position.y}vh`,
                //         left: `${position.x}vw`,
                //         opacity: 1,
                //     })
                // } else {

                //     await next({
                //         top: `0vh`,
                //         left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x}vw` : `${-10 + -(25 - level * 10) + position.x}vw`,
                //         opacity: 0,
                //     })
                // }
                setReadyToClearTree(true)
                // clearTree({
                //     variables: { id: treeId },
                //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
                // })
            } else if (showInorder) {
                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by inorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (inorder[id].index - inorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (inorder[id].index - inorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}` : `0vh`,
                            left: '48vw'
                        })
                    }
                }
            } else if (showPostorder) {

                if (!id.includes('right child') && !id.includes('left child')) {
                    if (parentId) {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            // left has to be adjusted by postorder index and position in tree to begin with
                            left: isLeftChild === true ? `${10 + -(-25 + level * 10) + position.x + 5 * (postorder[id].index - postorder[parentId].index)}vw` : `${-10 + -(25 - level * 10) + position.x + 5 * (postorder[id].index - postorder[parentId].index)}vw`,
                        })
                    } else {
                        await next({
                            top: level === 0 ? `${position.y}vh` : `0vh`,
                            left: `${position.x + Math.floor(numberOfNodes / 2) * 5}vw`
                        })
                    }
                }

            } else {
                if (level === 0) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })

                    if (levelsOfTree === 0) {
                        setAllowInteraction(true)
                    }
                }
                if (level === 1) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel2(true)
                    if (levelsOfTree === 1) {
                        setAllowInteraction(true)
                    }
                } else if (level === 2 && startLevel2) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    setStartLevel3(true)
                    if (levelsOfTree === 2) {
                        setAllowInteraction(true)
                    }
                } else if (level === 3 && startLevel3) {
                    await next({
                        top: `${position.y}vh`,
                        left: `${position.x}vw`,
                        opacity: 1,
                    })
                    if (levelsOfTree === 3) {
                        setAllowInteraction(true)
                    }
                }

            }
        }
    })

    useEffect(() => {
        if (beginInsert) {
            setBeginInsert(false)
        }
    }, [])

    useEffect(() => {
        preview(getEmptyImage());
    }, [])

    const deleteClick = (e: any) => {
        // e.stopPropagation()
        // deleteNode({
        //     variables: { id, parentId, isLeftChild },
        //     refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
        // })
    }

    const handleMouseEnter = () => {
        setNodeToDrag({ ...node, level: level })
    }

    const handleClick = (e: any) => {
        e.stopPropagation()

        if (numberOfNodes === 15) {
            return
        }

        setEdit(true)
    }

    const handleInputChange = (e: any) => {
        if (e.target.value.includes('.')) {
            setDecimalError(true)
        } else if (decimalError && e.target.value) {
            setDecimalError(false)
        }

        const newValue = parseInt(e.target.value)
        const leftChildValue = node.leftId ? treeState[node.leftId].value : -Infinity
        const rightChildValue = node.rightId ? treeState[node.rightId].value : Infinity

        if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0) {
            setNumberError(true)
        } else if (!(newValue >= leftChildValue && newValue < rightChildValue)) {
            setNumberError(true)
        } else if (!testNewValue(treeState, newValue, id, rootId)) {
            setNumberError(true)
        } else {
            if (numberError) {
                setNumberError(false)
            }
        }

        setEditValue(e.target.value)
    }

    const ref = useOnclickOutside(() => {
        if (edit) {

            const newValue = parseInt(editValue)

            if (!numberError && !decimalError) {
                const treeCopy = { ...treeState }

                treeCopy[id].value = newValue

                setTreeState(treeCopy)

                setEdit(false);

                editNode({
                    variables: { id, newValue: newValue },
                    refetchQueries: [{ query: GET_TREE, variables: { id: treeId } }]
                })
            }

        }

    });

    useEffect(() => {
        if (document.getElementById(`input-${id}`)) {
            document.getElementById(`input-${id}`)?.focus()
        }
    }, [edit])

    // console.log(Math.max(-nodeOffset / 10, -5))
    // console.log(Math.min(nodeOffset / 10, 5))

    function determineOffset() {

        if (level === 0) {
            return 0
        }
        if (level === 1) {
            return 0
        }
        if (level === 2) {
            return 0
        }
        if (level === 3) {
            return 4
        }
    }


    if (node && node.value !== -1) {
        return (
            <>
                <animated.div
                    id={id}
                    className={numberOfNodes !== 15 ? `leaf-${level}` : 'leaf-complete'}
                    style={(isDragging || hideDeletedNodes.has(id)) ? {
                        opacity: 0,
                    } : style}
                    ref={level === 0 || showPreorder || showInorder || showPostorder || !allowInteraction ? null : drag}
                    onMouseEnter={beginInsert ? undefined : handleMouseEnter}
                    onClick={handleClick}
                >
                    <CustomDragLayer
                        id={id}
                        node={nodeToDrag}
                        position={{ x: 0, y: 0 }}
                    />
                    {node &&
                        <>
                            {edit
                                ?
                                <input
                                    id={`input-${id}`}
                                    className={`edit-node-input-${level}`}
                                    type='number'
                                    value={editValue}
                                    onChange={handleInputChange}
                                    ref={ref}
                                />
                                :
                                node.value}
                            {(decimalError || numberError) && <div className='edit-error-message'>Invalid value</div>}
                            {node.leftId &&
                                <Leaf
                                    id={node.leftId}
                                    // position={{ x: -25 + level * 10, y: 10 }}
                                    position={{ x: Math.min(-nodeOffset / 10, 1 * (level + 1)) - 25 + level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }}
                                    node={treeState[node.leftId]}
                                    levelsOfTree={levelsOfTree}
                                    level={level + 1}
                                    beginInsert={beginInsert}
                                    setBeginInsert={setBeginInsert}
                                    loadingAnimationOn={loadingAnimationOn}
                                    allowInteraction={allowInteraction}
                                    setAllowInteraction={setAllowInteraction}
                                    isLeftChild={true}
                                    parentId={id}
                                    treeId={treeId}
                                />}
                            {(!node.leftId && level <= 2) && <Leaf
                                id={`left child of ${node.id}`}
                                position={{ x: Math.min(-nodeOffset / 10, 1 * (level + 1)) - 25 + level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }}
                                node={{
                                    id: `left child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null
                                }}
                                levelsOfTree={levelsOfTree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                loadingAnimationOn={loadingAnimationOn}
                                allowInteraction={allowInteraction}
                                setAllowInteraction={setAllowInteraction}
                                isLeftChild={true}
                                parentId={id}
                                treeId={treeId}
                            />
                            }
                            {node.rightId &&
                                <Leaf
                                    id={node.rightId}
                                    position={{ x: Math.max(nodeOffset / 10, -1 * (level + 1)) + 25 - level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }}
                                    node={treeState[node.rightId]}
                                    levelsOfTree={levelsOfTree}
                                    level={level + 1}
                                    beginInsert={beginInsert}
                                    setBeginInsert={setBeginInsert}
                                    loadingAnimationOn={loadingAnimationOn}
                                    allowInteraction={allowInteraction}
                                    setAllowInteraction={setAllowInteraction}
                                    isLeftChild={false}
                                    parentId={id}
                                    treeId={treeId}
                                />}
                            {(!node.rightId && level <= 2) && <Leaf
                                id={`right child of ${node.id}`}
                                position={{ x: Math.max(nodeOffset / 10, -1 * (level + 1)) + 25 - level * 10, y: 10 + Math.max(nodeOffset / 10, -4) }}
                                node={{
                                    id: `right child of ${node.id}`,
                                    value: -1,
                                    leftId: null,
                                    rightId: null,
                                }}
                                levelsOfTree={levelsOfTree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                loadingAnimationOn={loadingAnimationOn}
                                allowInteraction={allowInteraction}
                                setAllowInteraction={setAllowInteraction}
                                isLeftChild={false}
                                parentId={id}
                                treeId={treeId}
                            />
                            }

                        </>
                    }
                </animated.div>
            </>
        )
    } else {
        return (
            <animated.div
                id={id}
                className='leaf-0'
                style={
                    determinePosition()
                }
            >
            </animated.div>
        )
    }
}

export default Leaf