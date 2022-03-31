const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Product } = require('../models');

//CRUD.

//ADD.
//Post o agregar un cliente.
exports.add = async(req, res, next) => {
    try{
        const productData = {...req.body};

        const product = await Product.create(productData);
        res.json({
            message: "Producto registrado.",
            product,
        });
        
    } catch(error){
        let errores = [];
        if (error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: "Error al registrar Producto.",
            errors: errores,
        });
    }
};



//UPDATE
/*exports.actua = async (req, res, next ) => {
    try{
        const clienteData = {...req.body};
       

        await Customer.update(clienteData,{
            where: {
                id:req.params.id,
              },
        });
        res.json({
            message: "Cliente Actualizados.",
        });
        
    } catch(error){
        let errores = [];
        if (error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: "Información no actualizada.",
            errors: errores,
        });
    }
}*/
//LIST
exports.list = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: ['productCategory', 'images']
        });
        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer productos',
        });
    }
};



//LIST by Categoria
exports.listC = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {
                productCategoryId: req.params.id,
            },
            include: ['productCategory', 'images']
        });
        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer productos',
        });
    }
};


//Ramdon
exports.randomList = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {
                productCategoryId: req.params.id,
            },
            include: ['images'],
            order: Sequelize.literal('RAND()'),
            limit:5 ,
        });
        res.json(products);
        
    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer productos',
            
        });
        console.log(error);
        
    }
};
//SHOW
exports.show = async (req, res, next) => {
    try {
       
        const product = await Product.findOne({
            where: {id: req.params.id},
            include: ['productCategory','images'],
          });
        
        res.json(product);
        
    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer producto por id',
        });

    }
};
//SEARCH
exports.search = async (req, res, next) => {
    try {
        console.log(req.query);
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        description: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        price: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                }
            ]
        },
        include: ['productCategory','images'],
    });

    res.json({resultados: products});
    } catch (error) {
        res.status(500).json({
            message: 'Error, al buscar productos',
        });
        
    }
};

//DELETE