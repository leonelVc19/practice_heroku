const express = require('express');
/* Importación de AccessControl*/
const { grantAccess } = require('../middlewares/accessControl');

const router = express.Router();

//Importar controladoers
const customersController = require('../controllers/CustomerController');
const productCategoriesController = require('../controllers/productCategoriesController');
const productsController = require('../controllers/productsControllers');
const imageController = require('../controllers/imagesController');
/*njsdnsns */

//IMPORTAR RUTAS DE USUARIOS.
const usuariosController = require('../controllers/UsuariosController');


module.exports = () =>{

    //Clientes.
    router.get('/customers', grantAccess('readAny', 'customers'), customersController.list);
    router.post('/customers', grantAccess('createAny', 'customers'), customersController.add);
    router.get('/customers/:id', grantAccess('readAny', 'customers'),customersController.show);
    router.post('/filtrar', grantAccess('readAny', 'customers'),customersController.filtrar);
    router.get('/search', grantAccess('readAny', 'customers'),customersController.search);
    router.delete('/customers/:id',  grantAccess('deleteAny', 'customers'), customersController.eliminar);
    router.put('/customers/:id', customersController.actua);

    //rutas para productos categoria.
    router.get('/product-category', grantAccess('readAny', 'product-category'), productCategoriesController.list)
    router.post('/product-category', grantAccess('createAny', 'product-category'), productCategoriesController.add);
    router.get('/product-category/:id', grantAccess('readAny', 'product-category'), productCategoriesController.show);
    //Buscar productos
    router.get('/search_products', grantAccess('readAny', 'product-category'), productsController.search);
    //rutas para productos.
    router.get('/products', grantAccess('readAny', 'products'), productsController.list);
    router.post('/products', grantAccess('createAny', 'products'), productsController.add);
    router.get('/products/:id', grantAccess('readAny', 'products'), productsController.show);


    router.get('/products/category/:id', grantAccess('readAny', 'products'),  productsController.listC);
    router.get('/random-products/category/:id', grantAccess('readAny', 'products'), productsController.randomList);
    
    
    //Ruta para imagen
    router.post('/image', imageController.fileUpload, imageController.add);

    //Estas rutas son paras los usuarios. Pero estan protegidas
    //Solo se podran ejecutar si hay un usuario logueado con su teken.
    router.get('/usuarios',  usuariosController.list);
    router.get('/usuarios/:id',  usuariosController.show);
  
   
    return router;
}