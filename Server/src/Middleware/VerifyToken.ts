import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

export const verifyToken= (req:Request|any,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.token; 
    if(authHeader){
        const token:string|any = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET,(err,user):any=>{
            if(err) res.status(403).json("token is not valid");
            req.user =user;
            next();
        });
     } else{
            return res.status(401).json("you are not authenticated!");
        }
    }
    export const verifyTokenAndAuthorization=(req:Request|any,res:Response,next:NextFunction)=>{
        verifyToken(req,res,()=>{
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }else{
                res.status(403).json("you are not allowed to do that")
            }
        })
    }

    export const verifyTokenAndAdmin=(req:Request|any,res:Response,next:NextFunction)=>{
        verifyToken(req,res,()=>{
            if( req.user.isAdmin){
                next();
            }else{
                res.status(403).json("you are not allowed to do that")
            }
        })
    }