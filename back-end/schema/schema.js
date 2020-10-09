const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLSchema } = require('graphql')

const NodeType = new GraphQLObjectType({
    name: 'Node',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        left: {
            type: NodeType,
            resolve(parent, args) {
                // find node with id equal to parent.leftId
            }
        },
        right: {
            type: NodeType,
            resolve(parent, args) {
                // find node with id equal to parent.rightId
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        node: {
            type: NodeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})