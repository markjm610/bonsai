import { TreeObject, TreeNode } from './types'

export function preorderTraversal(tree: TreeObject, node: TreeNode, values: number[] = []): void {
    values.push(node.value)
    if (node.leftId) {
        preorderTraversal(tree, tree[node.leftId], values)
    }
    if (node.rightId) {
        preorderTraversal(tree, tree[node.rightId], values)
    }
}