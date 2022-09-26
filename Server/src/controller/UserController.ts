import {Router} from 'express'
import * as express from "express"
import { User } from '../models/User';


export class userController{
    //GET USER
    getUser = async(req: express.Request, res: express.Response, next)=>{
        try{
            const user:any= await User.findById(req.params.id)
            const {password,...others} =user._doc;
            res.status(200).json(others); 
          }catch(err){                                              
              res.status(500).json(err);
          }
    }

    //GET ALL USER
    getAllUser = async(req: express.Request, res: express.Response, next)=>{
        const query = req.query.new;
        try{
          const users:any=query ? await User.find().sort({_id:-1}).limit(1) : await User.find();
          res.status(200).json(users);
        }catch(err){
            res.status(500).json(err);
        }
    }
    //DELETE
    deleteUser = async(req: express.Request, res: express.Response, next)=>{
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted...")
         }catch(err){
             res.status(500).json(err);
         }
    }
    //UPDATE
    updateUser = async(req: express.Request, res: express.Response, next)=>{
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,process.env.PASS_SECRET
            ).toString();
         }
         try{
             const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
             },{new:true});
             res.status(200).json(updatedUser)
         }catch(err){
              res.status(500).json(err);
         }
    }
}