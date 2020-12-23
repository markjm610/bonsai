import { gql } from '@apollo/client'

export const ADD_TREE_NODE = gql`
    mutation($value: Int!, $root: Boolean!, $parentId: ID, $isLeftChild: Boolean!, $treeId: ID!) {
        addTreeNode(value: $value, root: $root, parentId: $parentId, isLeftChild: $isLeftChild, treeId: $treeId) {
            id
            value
            leftId
            rightId
            treeId
        }
    }
`

export const GET_ROOT = gql`
    query($treeId: ID!) {
        root(treeId: $treeId) {
            id
            value
            leftId
            rightId
            treeId
        }
    }
`

export const GET_TREE = gql`
    query($id: ID!){
        tree(id: $id) {
            id
            nodes {
                id
                value
                leftId
                rightId
                treeId
            }
            root {
                id
                value
                leftId
                rightId
                treeId
            }
        }
    }
`

export const CLEAR_TREE = gql`
    mutation($id: ID!){
        clearTree(id: $id){
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

export const DELETE_NODE = gql`
    mutation($id: ID!, $parentId: ID!, $isLeftChild: Boolean!){
        deleteNode(id: $id, parentId: $parentId, isLeftChild: $isLeftChild){
            id
        }
    }
`

export const EDIT_NODE = gql`
    mutation($id: ID!, $newValue: Int!){
        editNode(id: $id, newValue: $newValue){
            id
            value
        }
    }
`