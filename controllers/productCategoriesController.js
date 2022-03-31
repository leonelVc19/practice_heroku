const { ProductCategory } = require('../models');

//CRUD

//ADD.
//Post o agregar un cliente.
exports.add = async(req, res, next) => {
    try{
        const productCategoriesData = {...req.body};

        const category = await ProductCategory.create(productCategoriesData);
        res.json({
            message: "Categoria, registrada.",
            category,
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
            message: "Error al registrar Categoria.",
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
        const category = await ProductCategory.findAll({
            include: ['products']
        });
        res.json(category);

    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer categorias',
        });
    }
};
//SHOW
exports.show = async (req, res, next) => {

    try {
        const categories = await ProductCategory.findOne({
            where: {
                id:req.params.id,
              },
              include: ['products']
        });
        res.json(categories);
        
    } catch (error) {
        res.status(500).json({
            message: 'Erro a leer categoria por id',
        });

    }
};
//DELETE