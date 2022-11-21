'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_cadastros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_cadastros.init({
    id: {primaryKey: true, type:DataTypes.STRING},
    senha: DataTypes.STRING,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    endereço: DataTypes.STRING,
    cpf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_cadastros',
    freezeTableName: true,
    timestamps: false
  });
  return tb_cadastros;
};