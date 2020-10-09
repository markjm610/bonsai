const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLBoolean, GraphQLList } = require('graphql')
const TreeNode = require('../models/TreeNode')

const TreeNodeType = new GraphQLObjectType({
    name: 'TreeNode',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        leftId: { type: GraphQLID },
        rightID: { type: GraphQLID },
        // left: {
        //     type: TreeNodeType,
        //     async resolve(parent, args) {
        //         // find node with id equal to parent.leftId

        //         return await TreeNode.findById(parent.leftId)
        //     }
        // },
        // right: {
        //     type: TreeNodeType,
        //     async resolve(parent, args) {
        //         // find node with id equal to parent.rightId
        //         return await TreeNode.findById(parent.rightId)
        //     }
        // },
        root: { type: GraphQLBoolean }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        treeNode: {
            type: TreeNodeType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await TreeNode.findById(args.id)
            }
        },
        root: {
            type: TreeNodeType,
            async resolve(parent, args) {

                // const treeNode = await TreeNode.findOne({ root: true }).lean()
                // const queue = [treeNode]
                // while (queue[0]) {
                //     const currentNode = queue[0]
                //     const left = await TreeNode.findById(currentNode.leftId).lean()
                //     const right = await TreeNode.findById(currentNode.rightId).lean()

                //     currentNode.left = left
                //     currentNode.right = right
                //     if (left) {
                //         queue.push(left)
                //     }
                //     if (right) {
                //         queue.push(right)
                //     }
                //     queue.shift()
                // }

                // return treeNode

                return await TreeNode.findOne({ root: true })
            }
        },
        treeNodes: {
            type: new GraphQLList(TreeNodeType),
            async resolve(parent, args) {
                return await TreeNode.find({})
            }

        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTreeNode: {
            type: TreeNodeType,
            args: {
                value: { type: GraphQLInt },
                root: { type: GraphQLBoolean },
                parentId: { type: GraphQLID },
                isLeftChild: { type: GraphQLBoolean }
            },
            async resolve(parent, args) {
                const treeNode = new TreeNode({
                    value: args.value,
                    leftId: args.leftId,
                    rightId: args.rightId,
                    root: args.root
                })

                await treeNode.save()

                if (args.root) {
                    return treeNode
                }

                const parentNode = await TreeNode.findById(args.parentId)

                if (args.isLeftChild) {
                    parentNode.leftId = treeNode.id
                    await parentNode.save()
                } else {
                    parentNode.rightId = treeNode.id
                    await parentNode.save()
                }

                return treeNode
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})