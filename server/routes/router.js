const express = require('express');
const route = express.Router()


const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/',services.indexRoute);
route.get('/users', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

route.get('/add-product', services.add_product)
/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/add-product', services.add_product)
route.get('/products', services.products)
route.get('/update-product', services.update_product)
route.get('/basket', services.basket)
// API
//User API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
//PRoduct API
route.post('/api/products', controller.createProduct);
route.get('/api/products', controller.findProduct)
route.put('/api/products/:id', controller.updateProduct)
route.delete('/api/products/:id',controller.deleteProduct)

//LOGIN
route.post('/api/login', controller.login)

//BASKET
route.post('/api/basket',controller.addToCart)

module.exports = route