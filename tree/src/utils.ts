import { TreeObject, TreeNode, TraversalObject } from './types'

// insertNode will find the spot of the new node and keep track of the IDs of each node traversed so the
// the FakeNode component can look up the locations of the nodes on the screen
export function insertNode(value: number, node: TreeNode, tree: TreeObject, level: number, traversedNodes: string[] = []): [string, boolean, string[]] {

    traversedNodes.push(node.id)

    if (level > 3) {
        return ['invalid move', false, traversedNodes]
    }

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

}

export function countTreeLevels(tree: TreeObject, rootId: string): number {
    let maxLevel: number = 0
    function traverse(node: TreeNode, level: number = 0): void {
        maxLevel = Math.max(level, maxLevel)
        if (node.leftId) {
            traverse(tree[node.leftId], level + 1)
        }
        if (node.rightId) {
            traverse(tree[node.rightId], level + 1)
        }
    }
    traverse(tree[rootId])
    return maxLevel
}

export function preorderTraversal(tree: TreeObject, node: TreeNode, positions: TraversalObject = {}): TraversalObject {
    positions[node.id] = { index: Object.keys(positions).length, value: node.value }

    if (node.leftId) {
        preorderTraversal(tree, tree[node.leftId], positions)
    }

    if (node.rightId) {
        preorderTraversal(tree, tree[node.rightId], positions)
    }

    return positions
}

export function inorderTraversal(tree: TreeObject, node: TreeNode, positions: TraversalObject = {}): TraversalObject {
    if (node.leftId) {
        inorderTraversal(tree, tree[node.leftId], positions)
    }

    positions[node.id] = { index: Object.keys(positions).length, value: node.value }

    if (node.rightId) {
        inorderTraversal(tree, tree[node.rightId], positions)
    }

    return positions
}

export function postorderTraversal(tree: TreeObject, node: TreeNode, positions: TraversalObject = {}): TraversalObject {
    if (node.leftId) {
        postorderTraversal(tree, tree[node.leftId], positions)
    }

    if (node.rightId) {
        postorderTraversal(tree, tree[node.rightId], positions)
    }

    positions[node.id] = { index: Object.keys(positions).length, value: node.value }

    return positions
}

export function inorderCheck(tree: TreeObject, rootId: string): boolean {

    // Need to check for equal to

    // Maybe try inserting it and seeing if the IDs match instead of inorder?

    const inorderArray: number[] = []
    function buildArray(node: TreeNode) {
        if (node.leftId) {
            buildArray(tree[node.leftId])
        }
        inorderArray.push(node.value)
        if (node.rightId) {
            buildArray(tree[node.rightId])
        }

    }
    buildArray(tree[rootId])
    for (let i = 0; i < inorderArray.length; i++) {
        if (inorderArray[i + 1] && inorderArray[i + 1] < inorderArray[i]) {
            return false
        }
    }
    return true
}

export function testNewValue(tree: TreeObject, newValue: number, id: string, rootId: string): boolean {
    // insert new value on current tree, see if it ends up in the same spot as current value

    function testInsert(node: TreeNode): boolean {
        if (node.id === id) {
            return true
        }

        if (node.leftId && newValue <= node.value) {
            return testInsert(tree[node.leftId])
        }

        if (node.rightId && newValue > node.value) {
            return testInsert(tree[node.rightId])
        }

        return false
    }

    return testInsert(tree[rootId])
}