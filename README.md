# [Binary Tree Visualization](https://tree-project-mark.herokuapp.com/)

## What is this?

A mini app that recursively renders a binary search tree and animates the nodes falling into their correct spots.

## Technologies 

- TypeScript
- React / Hooks
- react-spring for animations (react-spring.io)
- GraphQL / Apollo
- Tests in Cypress and Enzyme/Jest
- MongoDB / Mongoose

## How it works

(Parts of the code have been removed to make the relevant parts shorter and easier to read)

Fetch tree data and store it in the state as a nested object for constant time lookup of nodes:
```javascript
    useEffect(() => {
        if (rootData && treeNodesData) {

            // Object of TreeNodes
            const treeNodesObj: TreeObject = {}

            // This loop converts the tree from an array to a nested object for constant time lookup of nodes
            treeNodesData.treeNodes.forEach((treeNode: TreeNode) => {
                treeNodesObj[treeNode.id] = {
                    id: treeNode.id,
                    value: treeNode.value,
                    leftId: treeNode.leftId,
                    rightId: treeNode.rightId
                }
            })

            // Store the nested object in the state so this and other components have access to it
            setTreeState(treeNodesObj)
        }

    }, [rootData, treeNodesData])

```


The Leaf component is each node in the tree. It returns itself, rendering the tree recursively:
```javascript
// Component body and part of return statement not shown

// Component returns itself checking for left and right children
return (
            <animated.div>
                { node &&
                    <>
                        {node.value}
                        {node.leftId &&
                            <Leaf
                                id={node.leftId}
                                position={{ x: -25 + level * 10, y: 10 }}
                                node={tree[node.leftId]}
                                tree={tree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                numberOfNodes={numberOfNodes}
                            />}
                        {node.rightId &&
                            <Leaf
                                id={node.rightId}
                                position={{ x: 25 - level * 10, y: 10 }}
                                node={tree[node.rightId]}
                                tree={tree}
                                level={level + 1}
                                beginInsert={beginInsert}
                                setBeginInsert={setBeginInsert}
                                numberOfNodes={numberOfNodes}
                            />}
                        }
                    </>
                }
            </animated.div >
```

When a user adds a new node, the insertNode function is called to find where the node should be added and the path taken: 
```javascript
function insertNode(value: number, node: TreeNode, tree: TreeObject, level: number, traversedNodes: string[] = []): [string, boolean, string[]] {

    // The IDs of the traversed nodes will be used to determine the path of the animation
    traversedNodes.push(node.id)
    
    // The binary tree has a maximum size
    if (level > 3) {
        return ['invalid move', false, traversedNodes]
    }
    
    // Returns the ID of the node to add to, whether it is a left or right child, and the array of traversed node IDs
    if (value > node.value) {
        if (node.rightId) {
            return insertNode(value, tree[node.rightId], tree, level + 1, traversedNodes)
        } else {
            return [node.id, false, traversedNodes]
        }
    } else {
        if (node.leftId) {
            return insertNode(value, tree[node.leftId], tree, level + 1, traversedNodes)
        } else {
            return [node.id, true, traversedNodes]
        }
    }
```

When a new node is added, a FakeNode component is created as the input field is hidden. The fake node animates to the new node's position, creating the illusion that a new node is working its way down the tree:
```javascript

// useSpring is from the react-spring library
const newNodeStyle = useSpring({

        from: { top: inputElementTop, left: inputElementLeft, position: 'fixed', backgroundColor: 'rgb(245, 245, 245)', opacity: 1 },
        to: async (next: Function) => {

            if (!animationDone && traversedNodeIds.length) {


                // For each node on the path, an animation waypoint is created using the IDs of each node found with the insertNode function
                let i = 0
                while (i < traversedNodeIds.length) {

                    // This step is how the fake node knows where to move to. The IDs of the traversed nodes are also id fields on the corresponding HTML elements
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
                  
                  
                    // The next function takes in the waypoints of the animation, found based on the locations of the traversed nodes
                    if (i === 0) {
                        await next({
                            top: nodeLocation.top,
                            left: nodeLocation.left,
                            backgroundColor: 'rgb(245, 245, 245)'
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

                // When the animation is done, a boolean value is flipped to true and the traversed node IDs are cleared
                setAnimationDone(true)
                setTraversedNodeIds([])

            }

        }
```

Now that the animation is complete, a mutation can be sent to the GraphQL server adding the new node, triggering a refetch of the tree data:
```javascript
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
  ```
  
  The FakeNode component only renders conditionally when beginInsert is true (props not shown):
  ```javascript
        {beginInsert && <FakeNode/>}
  ```
  
  So, this means that by setting beginInsert to false, the fake node goes away, but this can only happen once the new node has taken its place to avoid flickering.

  Refetching the tree data causes a new Leaf component to render. This triggers a useEffect on the new Leaf component that only runs when beginInsert is true:
  ```javascript
      // If beginInsert is true, it means this Leaf was added by the user, not when the page first loaded.
      // By setting beginInsert to false, it removes the fake node. 
      useEffect(() => {
        if (beginInsert) {
            setBeginInsert(false)
        }
    }, [])
  ```
  
  Now, the blank node/input form shows up again, the fake node is removed, and the new node is rendered in its correct spot.
