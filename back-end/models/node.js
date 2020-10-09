'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Node.init({
    value: DataTypes.INTEGER,
    leftId: DataTypes.INTEGER,
    rightId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};