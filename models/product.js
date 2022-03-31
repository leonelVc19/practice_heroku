'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.ProductCategory,
        {
          as:'productCategory',
          foreingKey: 'productcategoryId',
        });

        //Un producto tiene muchas imágenes.
        models.Product.hasMany(models.Image, {
          as: 'images',
        });
      
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    rating: DataTypes.INTEGER,
    productcategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};