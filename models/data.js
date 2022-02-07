'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    static associate(models) {
      Data.belongsTo(models.User)
    }
  }
  Data.init({
    browse: DataTypes.STRING,
    content: DataTypes.STRING,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};