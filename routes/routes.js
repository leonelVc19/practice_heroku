const express = require('express');
const router = express.Router();

//Importar controladoers
const customersController = require('../controllers/CustomerController');
const productCategoriesController = require('../controllers/productCategoriesController');
const productsController = require('../controllers/productsControllers');
const imageController = require('../controllers/imagesController');


//IMPORTAR RUTAS DE USUARIOS.
const usuariosController = require('../controllers/UsuariosController');

module.exports = () =>{

    //Clientes.
    router.get('/customers', customersController.list);
    router.post('/customers', customersController.add);
    router.get('/customers/:id', customersController.show);
    router.post('/filtrar', customersController.filtrar);
    router.get('/search', customersController.search);
    router.delete('/customers/:id', customersController.eliminar);
    router.put('/customers/:id', customersController.actua);

    //rutas para productos categoria.
    router.get('/product-category', productCategoriesController.list)
    router.post('/product-category', productCategoriesController.add);
    router.get('/product-category/:id', productCategoriesController.show);
    //Buscar productos
    router.get('/search_products', productsController.search);
    //rutas para productos.
    router.get('/products', productsController.list);
    router.post('/products', productsController.add);
    router.get('/products/:id', productsController.show);


    router.get('/products/category/:id', productsController.listC);
    router.get('/random-products/category/:id', productsController.randomList);
    
    
    //Ruta para imagen
    router.post('/image', imageController.fileUpload, imageController.add);

    //Estas rutas son paras los usuarios. Pero estan protegidas
    //Solo se podran ejecutar si hay un usuario logueado con su teken.
    router.get('/usuarios',  usuariosController.list);
    router.get('/usuarios/:id',  usuariosController.show);
  
   
    return router;
}