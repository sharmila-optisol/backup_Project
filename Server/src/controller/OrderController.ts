import {Router} from 'express'
import * as express from "express"
import {Order} from '../models/Order'

export class orderController{
    //CREATE
    createOrder = async(req: express.Request, res: express.Response, next)=>{
        const newOrder = new Order(req.body);
        console.log("new:",newOrder);
        try{
            const savedOrder  = await newOrder.save(); 
            res.status(200).json(savedOrder);
        }catch(err){
            res.status(500).json(err);
        }
    }
    //UPDATE
    updateOrder = async(req: express.Request, res: express.Response, next)=>{
        try{
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
               $set:req.body,
            },{new:true});
            res.status(200).json(updatedOrder)
        }catch(err){
             res.status(500).json(err);
        }
    }
    //DELETE
    deleteOrder = async(req: express.Request, res: express.Response, next)=>{
        try{
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json("order has been deleted...")
         }catch(err){
             res.status(500).json(err);
         }
    }
    //GET USER ORDER
    getUserOrder = async(req: express.Request, res: express.Response, next)=>{
        try{
            const orders= await Order.find({userId:req.params.userId})
            res.status(200).json(orders); 
          }catch(err){
              res.status(500).json(err);
          }
    }
    //GET ALL ORDER
    getAllOrder = async(req: express.Request, res: express.Response, next)=>{
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
        }catch(err){
            res.status(500).json(err);
        }
    }
}