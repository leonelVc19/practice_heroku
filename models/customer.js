'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here definico de relacion
      //un cliente pertenece a una categoria
      models.Customer.belongsTo(models.Category, {
        as: 'category',
        foreingKey: 'categoryId',
      });
    }
  }
  Customer.init({
    name:{ 
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre no puede quedar vacío',
        },
        len: {
          args: [0,40],
          msg: 'Nombre solo acepta 40, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'Nombre solo acepta letras',
        }
      }
    },
    

    email:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El email no puede quedar vacío',
        },
        isEmail:{
          args: true,
          msg: 'Se deve proporcionar un email valido',
        },
        len: {
          args: [0,30],
          msg: 'Email solo acepta 30, caracteres'
        }
      }
    },

    phone:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El teléfono no puede quedar vacío',
        },
        isNumeric:{
          args: true,
          msg: 'El teléfono solo acepta caracteres, numericos',
        },
        len: {
          args: [1,10],
          msg: 'Teléfono solo acepta 10, caracteres'
        },
        is:{
          args: /^[0-9]{3}[0-9]{7}$/,
          msg: 'No es un número teléfonico, valido',
        }
      }
    },
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};