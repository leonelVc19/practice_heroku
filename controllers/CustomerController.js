const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Customer } = require('../models');

//Post o agregar un cliente.
exports.add = async(req, res, next) => {
    try{
        const clienteData = {...req.body};

        const customer = await Customer.create(clienteData);
        res.json({
            message: "Cliente registrado.",
            customer,
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
            message: "Error al registrar cliente.",
            errors: errores,
        });
    }
};



//Código para actualizar la información de un usuario
exports.actua = async (req, res, next ) => {
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
}



//encontrar a un usuario.
exports.show = async (req, res, next) => {

    try {
        const customers = await Customer.findOne({
            where: {
                id:req.params.id,
              },
            include: ['category']
        });
        if(!customers) {
            res.status(404).json({message:'No se encontro al cliente'});
        } else {
            res.json(customers);
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer clientes por id',
        });

    }
};

//Listado de los clientes que encuentra en la abse de datos-
exports.list = async (req, res, next) => {
    try {
        const customers = await Customer.findAll({
            include: ['category']
        });
        res.json(customers);

    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer clientes',
        });
    }
};

//Parte de filtro.
exports.filtrar = async (req, res, next) => {
    try {
        const customers = await Customer.findAll({
            where: {
                categoryId: req.body.category,
            },
            include: ['category']
        });
        res.json({resultados: customers});

    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer clientes 1',
        });

    }
};


/*
funcion para hacer la busqueda de algun usuario que 
encuentre en la base de datos.*/

exports.search = async (req, res, next) => {
    try {
        console.log(req.query);
        const customers = await Customer.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        phone: {
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                }
            ]
        },
        include: ['category'],
    });

    res.json({resultados: customers});
    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer cliente',
        });
    }
};



//ELIMINAR A UN USUARIO.

exports.eliminar  = async (req, res) => {
    try {
       await Customer.destroy({
            where: {
                id: req.params.id,
            },
        }); 
        res.json({
            message:'El cliente a sido eliminado.'
        });
        
    } catch (error){
        res.status(500).json({
            message: 'Erro al eliminar cliente.',
        });
    }
}