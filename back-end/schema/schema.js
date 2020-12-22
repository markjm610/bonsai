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
            type: GraphQLList(TreeNodeType),
            async resolve(parent, args) {
                return await TreeNode.find({ treeId: parent.id })
            }
        },
        root: {
            type: GraphQLList(TreeNodeType),
            async resolve(parent, args) {
                const root = await TreeNode.find({ treeId: parent.id, root: true })

                return root
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
        // root: {
        //     type: TreeNodeType,
        //     args: { treeId: { type: GraphQLID } },
        //     async resolve(parent, args) {

        //         const root = await TreeNode.findOne({ treeId: args.treeID, root: true })

        //         return root
        //     }
        // },
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
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const root = await TreeNode.findOne({ treeId: args.id, root: true })

                root.leftId = null
                root.rightId = null
                await root.save()
                await TreeNode.deleteMany({ treeId: args.id, root: false })
                return root
            }
        },
        deleteNode: {
            type: TreeNodeType,
            args: {
                id: { type: GraphQLID },
                parentId: { type: GraphQLID },
                isLeftChild: { type: GraphQLBoolean },
            },
            async resolve(parent, args) {

                const parentNode = await TreeNode.findById(args.parentId)

                if (args.isLeftChild) {
                    parentNode.leftId = null
                } else {
                    parentNode.rightId = null
                }

                await parentNode.save()

                const queue = [args.id]

                while (queue.length) {
                    const idToDelete = queue.shift()
                    const node = await TreeNode.deleteOne({ id: idToDelete })

                    if (node.leftId) {
                        queue.push(node.leftId)
                    }
                    if (node.rightId) {
                        queue.push(node.rightId)
                    }

                }

                return parentNode
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

                const rootLeft = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 25,
                    leftId: null,
                    rightId: null
                })

                const rootRight = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 75,
                    leftId: null,
                    rightId: null
                })

                const rootRightLeft = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 68,
                    leftId: null,
                    rightId: null
                })

                const rootRightLeftRight = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 71,
                    leftId: null,
                    rightId: null
                })


                const rootRightRight = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 90,
                    leftId: null,
                    rightId: null
                })

                const rootLeftLeft = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 10,
                    leftId: null,
                    rightId: null
                })

                const rootLeftLeftLeft = await TreeNode.create({
                    treeId: tree.id,
                    root: false,
                    value: 1,
                    leftId: null,
                    rightId: null
                })

                root.leftId = rootLeft.id
                root.rightId = rootRight.id
                rootRight.leftId = rootRightLeft.id
                rootRight.rightId = rootRightRight.id
                rootRightLeft.rightId = rootRightLeftRight.id
                rootLeft.leftId = rootLeftLeft.id
                rootLeftLeft.leftId = rootLeftLeftLeft.id

                await root.save()
                await rootRight.save()
                await rootLeft.save()
                await rootLeftLeft.save()
                await rootRightLeft.save()

                return tree
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})