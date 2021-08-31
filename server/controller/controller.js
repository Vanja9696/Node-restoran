const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config()



const {Userdb, Productdb, Basketdb} = require('../model/model');
// create and save new user
exports.create = async (req,res)=>{
    // validate request
    try{
        if(!req.body){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
        
        const{name, email, password,adress} = req.body;

        const oldUser= await Userdb.findOne({email});
        if (oldUser){
        return res.status(409).send("User already exist")
        }
        encryptedPassword=await bcrypt.hash(password, 10)
        // new user
        const user = await Userdb.create({
            name,
            adress,
            email:email.toLowerCase(),
            password:encryptedPassword,

        })
            const token= jwt.sign({
                user_id:user._id, email
            },
                "sadasdasd",{
                    expiresIn:"2h",
            }
            )
            user.token=token
            res.status(201).json(user)

            res.redirect('/products')
            res.send(data)
            
    }catch(err){
            console.log(err);
          }
}
exports.addToCart=async(req,res)=>{
    const id = req.query.id
    const quantity= Number.parseInt(req.body.quantity);
    try{

    }catch{

    }
}
exports.login= async(req,res)=>{
    try{
        const{email, password}=req.body;
        if(!(email && password)){
            res.status(400).send("All input is required")
        }
        const user = await Userdb.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))){
            const token= jwt.sign({
                user_id:user._id, email
            },
                "sadasdasd",{
                    expiresIn:"2h",
            }
            )
            user.token = token;
            res.redirect('/products')
            res.status(200).json(user)
            res.send(data)
            res.redirect('/users')
        }
        res.status(400).send("Invalid credentials")
    }catch(err){
        console.log(err)
    }
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

//create and save new product

exports.createProduct = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be emited"})
        return;
    }

    const product = new Productdb({
        name: req.body.name,
        price: req.body.price,
        availabillity: req.body.availabillity
    })
    product
        .save(product)
        .then(data=>{
            res.redirect('/add-product')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message|| "Some errors occured"
            })
        })
}

//return and retrieve all products/one product
exports.findProduct=(req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Productdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"User not found"})
                }else{
                    res.send(data)
                }

            })
            .catch(err =>{
                res.status(500).send({message: "Error ocucred"})
            })
    }
    else{
        Productdb.find()
            .then(product=>{
                res.send(product)
            })
            .catch(err=>{
                res.status(500).send({message:err.message||"Error occured"})
            })
    }
}

exports.updateProduct=(req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update can't be empty"})
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message :'Cannot Update'})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error Update product"})
        })
}
exports.deleteProduct = (req,res)=>{
    const id= req.params.id;
        Productdb.findByIdAndDelete(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Cannot delete product"})

                }else{
                    res.send({
                        message: "Product deleted successfully"
                    })
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message: "could not delete product"
                })
            })
}
