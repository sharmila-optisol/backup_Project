import {Router} from 'express'
import * as express from "express"
import {Product} from '../models/Product'


export class productController{
    //CREATE
    createProduct = async(req: express.Request, res: express.Response, next)=>{
        const newProduct = new Product(req.body);
        try{
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        }catch(err){
            res.status(500).json(err);
        }
    }
    //UPDATE
    updateProduct = async(req: express.Request, res: express.Response, next)=>{
        try{
            console.log("req:",req.params.id,req.body);
            const existingProduct = await Product.findById(req.params.id)
            // console.log("pdt",existingProduct)
            
            existingProduct.title = req.body.title ? req.body.title : existingProduct.title
            existingProduct.desc = req.body.desc ? req.body.desc : existingProduct.desc
            existingProduct.categories = req.body.categories ? req.body.categories : existingProduct.categories
            existingProduct.img = req.body.img ? req.body.img : existingProduct.img
            existingProduct.price = req.body.price ? req.body.price : existingProduct.price
             const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
                $set:req.body
             },{new:true});
             res.status(200).json(updatedProduct)
         }catch(err){
              res.status(500).json(err);
         }
    }
    //DELETE
    deleteProduct = async(req: express.Request, res: express.Response, next)=>{
        try{
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("product has been deleted...")
         }catch(err){
             res.status(500).json(err);
         }
    }
    //GET PRODUCT
    getProduct = async(req: express.Request, res: express.Response, next)=>{
        try{
            const product:any= await Product.findById(req.params.id)
            res.status(200).json(product); 
          }catch(err){
              res.status(500).json(err);
          }
    }
    //GET ALL PRODUCT
    getAllProduct = async(req: express.Request, res: express.Response, next)=>{
        const qNew = req.query.new;
    const qCatergory = req.query.catergory;
    try{
        let products;
       if(qNew){
        products = await Product.find().sort({createdAt:-1}).limit(1);
       }else if(qCatergory){
        products = await Product.find({categories:{
            $in :[qCatergory],
        },
    });
       }else{
        products = await Product.find()
       }
      res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
    }
    //search
    search = async(req: express.Request, res: express.Response, next)=>{
        const product = req.query.search;
    console.log(req.query)
    const products = await Product.find({title:{$regex:product,$options:'$i'}});
    if(products.length > 0){
        return res.status(200).json({products,categories:products[0].categories[1]})
    }
    return null;
    }
    //review
    review = async(req, res, next)=>{
        const {rating,comment} =req.body;
        const product = await Product.findById(req.params.id);
         console.log(product)
        if(product){
         const alreadyReviewed = product.reviews.find((r:any)=>
         r.user === req.user?._id
         ) 
         if(alreadyReviewed){
             return  res.status(400).json("already reviewed");
             
         }    
         console.log(alreadyReviewed)
         const review ={                                                                  
             name: req.user?.username,
             rating:Number(rating),
             comment,
             user:req.user?._id,
         };
         console.log(review);
         product.reviews.push(review);
         product.numReviews = product.reviews.length;
         await product.save();
         return res.status(201).json({message:"message reviewed"})
        }else{
         return res.status(404).json("eror");
        }
    }
}