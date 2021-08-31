const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.indexRoute=(req, res)=>{
    res.render('frontPage');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_product=(req, res)=>{
    res.render('add_product')
}

exports.products=(req,res)=>{
    axios.get('http://localhost:3000/api/products')
        .then(function(response){
            res.render('products',{products: response.data});
        })
        .catch(err =>{
            res.send(err)
        })
}
exports.update_product=(req, res)=>{
    axios.get('http://localhost:3000/api/products', {params: {id:req.query.id}})
        .then(function(productdata){
            res.render("update_product", { product: productdata.data})
        })
        .catch(err =>{
            res.send(err)
        })
}
exports.basket=(req,res)=>{
    res.render("ShoppingBasket")
}