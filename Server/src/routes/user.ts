import {Router} from 'express'
import { User } from '../models/User';
import {verifyTokenAndAuthorization,verifyTokenAndAdmin} from '../Middleware/VerifyToken'
import {body } from "express-validator";
import { userController } from "../controller/UserController";
const UserController = new userController();

const router =Router();

//UPDATE
router.put('/:id',verifyTokenAndAuthorization,
[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
    body("username").isAlpha().withMessage("Invalid Name"),
],UserController.updateUser);
//DELETE
router.post("/:id",verifyTokenAndAuthorization,UserController.deleteUser);
//GET USER
router.get("/find/:id",verifyTokenAndAdmin,UserController.getUser);
//GET ALL USER

router.get("/",verifyTokenAndAdmin,UserController.getAllUser);                                           
//GET USER STATUS
router.get("/status",verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
    const data = await User.aggregate([
        {$match : {createdAt: {$gte : lastYear}}},
        {$project :{
            month : {$month:"$createdAt"},
        }},
        {$group:{
            _id : "$month",
            total :{$sum : 1},
        }}
    ]);
    res.status(200).json(data);
    }catch(err){
        res.status(500).json(err); 
    }
})

export default router;