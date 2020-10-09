import { gql } from '@apollo/client'

export const ADD_TREE_NODE = gql`
    mutation($value: Int!, $root: Boolean!, $parentId: ID, $isLeftChild: Boolean!) {
        addTreeNode(value: $value, root: $root, parentId: $parentId, isLeftChild: $isLeftChild) {
            id
            value
            leftId
            rightId
        }
    }
`

export const GET_ROOT = gql`
    {
        root {
            id
            value
            leftId
            rightId
        }
    }
`

export const GET_TREENODES = gql`
    {
        treeNodes {
            id
            value
            leftId
            rightId
        }
    }
`