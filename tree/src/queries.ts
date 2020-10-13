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
    query($treeId: ID) {
        root(treeId: $treeId) {
            id
            value
            leftId
            rightId
        }
    }
`

export const GET_TREE = gql`
    {
        tree(id: ID) {
            id
            nodes
        }
    }
`

export const CLEAR_TREE = gql`
    mutation {
        clearTree {
            id
        }
    }
`

export const CREATE_TREE = gql`
    mutation {
        createTree {
            id
        }
    }
`