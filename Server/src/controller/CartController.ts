import {Router} from 'express'
import * as express from "express"
import {Cart} from '../models/Cart'

export class cartController{
    //CREATE
    createCart = async(req: express.Request, res: express.Response, next)=>{
        const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
    }
    //UPDATE
    updateCart = async(req: express.Request, res: express.Response, next)=>{
        try{
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
               $set:req.body
            },{new:true});
            res.status(200).json(updatedCart)
        }catch(err){
             res.status(500).json(err);
        }
    }
    //DELETE
    deleteCart = async(req: express.Request, res: express.Response, next)=>{
        try{
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json("cart has been deleted...")
         }catch(err){
             res.status(500).json(err);
         }
    }
    //GET USER CART
    getUserCart = async(req: express.Request, res: express.Response, next)=>{
        try{
            const cart:any= await Cart.findOne({userId:req.params.userId})
            res.status(200).json(cart); 
          }catch(err){
              res.status(500).json(err);
          }
    }
    //GET ALL CART
    getAllCart = async(req: express.Request, res: express.Response, next)=>{
        try{
            const carts = await Cart.find();
            res.status(200).json(carts);
        }catch(err){
            res.status(500).json(err);
        }
    }
}