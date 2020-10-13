const mongoose = require('mongoose')

const Schema = mongoose.Schema

const treeSchema = new Schema({})

const Tree = mongoose.model('Tree', treeSchema)

module.exports = Tree