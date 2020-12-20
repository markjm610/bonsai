import { TreeObject, TreeNode } from './types'

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

export function preorderTraversal(tree: TreeObject, node: TreeNode, positions: any = {}): number[] {
    positions[node.id] = { index: Object.keys(positions).length, value: node.value }
    if (node.leftId) {
        preorderTraversal(tree, tree[node.leftId], positions)
    }
    if (node.rightId) {
        preorderTraversal(tree, tree[node.rightId], positions)
    }
    return positions
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