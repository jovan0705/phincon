'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyPokemon.init({
    pokemonId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    renameFlag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyPokemon',
  });
  return MyPokemon;
};