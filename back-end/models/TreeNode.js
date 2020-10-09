const mongoose = require('mongoose')

const Schema = mongoose.Schema

const treeNodeSchema = new Schema({
    value: { type: Number, required: true },
    leftId: { type: mongoose.Types.ObjectId, ref: 'TreeNode' },
    rightId: { type: mongoose.Types.ObjectId, ref: 'TreeNode' },
    root: { type: Boolean, required: true }
})

const TreeNode = mongoose.model('TreeNode', treeNodeSchema)

module.exports = TreeNode