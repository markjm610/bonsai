const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLSchema } = require('graphql')

const TreeNodeType = new GraphQLObjectType({
    name: 'TreeNode',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        left: {
            type: TreeNodeType,
            resolve(parent, args) {
                // find node with id equal to parent.leftId
            }
        },
        right: {
            type: TreeNodeType,
            resolve(parent, args) {
                // find node with id equal to parent.rightId
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tree_node: {
            type: TreeNodeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})