const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLBoolean, GraphQLList } = require('graphql')
const TreeNode = require('../models/TreeNode')
const Tree = require('../models/Tree')

const TreeNodeType = new GraphQLObjectType({
    name: 'TreeNode',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        leftId: { type: GraphQLID },
        rightId: { type: GraphQLID },
        root: { type: GraphQLBoolean },
        treeId: { type: GraphQLID }
    })
})

const TreeType = new GraphQLObjectType({
    name: 'Tree',
    fields: () => ({
        id: { type: GraphQLID },
        nodes: {
            type: new GraphQLList(TreeNodeType),
            async resolve(parent, args) {
                return await TreeNode.find({ treeId: parent.id })
            }
        }
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
            args: { treeId: { type: GraphQLID } },
            async resolve(parent, args) {
                return await TreeNode.findOne({ treeId: args.treeID, root: true })
            }
        },
        tree: {
            type: TreeType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await Tree.findById(args.id)
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
                isLeftChild: { type: GraphQLBoolean },
                treeId: { type: GraphQLID }
            },
            async resolve(parent, args) {

                try {
                    const treeNode = new TreeNode({
                        value: args.value,
                        leftId: args.leftId,
                        rightId: args.rightId,
                        root: args.root,
                        treeId: args.treeId
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
                } catch (e) {
                    console.error(e)
                }

            }
        },
        clearTree: {
            type: TreeNodeType,
            async resolve(parent, args) {
                const root = await TreeNode.findOne({ treeId: args.treeId, root: true })
                root.leftId = null
                root.rightId = null
                await root.save()
                await TreeNode.deleteMany({ treeId: args.treeId, root: false })
            }
        },
        createTree: {
            type: TreeType,
            async resolve(parent, args) {
                const tree = await Tree.create({})

                const root = await TreeNode.create({
                    treeId: tree.id,
                    root: true,
                    value: 50,
                    leftId: null,
                    rightId: null
                })
                return tree
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})