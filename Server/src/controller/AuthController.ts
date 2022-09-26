import {Router} from 'express'
import { User } from '../models/User'
import * as CryptoJS from 'crypto-js';
import * as express from "express"
const nodemailer=require("nodemailer");
const crypto = require('crypto');
import { transporter } from '../Middleware/Transporter';
import * as jwt from 'jsonwebtoken'
import { Otp } from '../models/Otp';

export class authController{
    userLogin = async(req:express.Request, res:express.Response, next)=>{
      const {username}=req.body
        try{
            const user:any = await User.findOne({username});
            if(!user) return res.status(401).json("Wrong Credentials")
            const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET);
            const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            console.log("use",orginalPassword)
           if( orginalPassword!== req.body.password) return res.status(401).json("Wrong Credentials");
          
            const accessToken = jwt.sign({
              id: user._id,
              isAdmin:user.isAdmin,
            },process.env.JWT_SECRET,{
              expiresIn:"10d"
            })
            const {password,...others} =user._doc;
            return res.status(200).json({...others,accessToken}); 
          }catch(err){
             return  res.status(500).send({
                  message:
                    err.message || "Some error occurred ."
                }); 
          }
    }

//register                  
register = async(req:express.Request, res:express.Response, next)=>{
  try{
    const {username,email,password}=req.body
      const existingUser =await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"sorryrrr"})
    }
      const newUser = new User({
             username:username,
             email:email,
             password:CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
            isVerified: false,
            emailToken: crypto.randomBytes(64).toString("hex"),
  
  
      })
      
          const savedUser = await newUser.save();
          const mailOptions = {
           from: "sharmijayac@gmail.com",
           to: newUser.email,
           subject: "Verify your email address",
           html: `<p>Hello ${newUser.username}! A Message from online shopping
           !.Please Verify your email address to complete the signup process and login to your account</p>
        <p>press here <a href="http://${req.headers.host}/api/auth/verify-email?token=${newUser.emailToken}"> here</a> to verify your mailId. </p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.log(error);
      }
      console.log("Verification Mail sent");
     return res.status(400).json({ message: "Verification Mail sent" });
      });
          return res.status(201).json(savedUser);
         }
      catch(err){
        return res.json(err);
        }
}
//googlelogin
   googleLogin = async(req:express.Request, res:express.Response, next)=>{
    const { email, name, token, googleId, } = req.body;
 try {
    const existingUser:any = await User.findOne({ email });
    if (existingUser &&existingUser.isVerified) {
      res.status(400).json({ message: "Email Address already exists" });
    } else if (existingUser) {
      res.status(200).json({ result: existingUser, token });
    }
    if (!existingUser) {
        const result = await User.create({
           email,
           username:name,
           googleId,
          });
      res.status(200).json({ result, token });
    }

  } catch (err) {
     console.log(err);
    }
}
//emailVerify
emailVerify = async(req:express.Request, res:express.Response, next)=>{
  try {
    //getting token from mail verification
    const token = req.query.token;
    //Checking if there any emailToken with token
    const user = await User.findOne({ emailToken: token });
    if (user) {
//assign value to database as verified
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
 //redirect to login page after verify email
 return res.redirect("http://localhost:3000/login");
}else {
    console.log("Email is not verified");
}
}catch (error) {
console.log(error);
}
}
//otp 
otp = async(req:express.Request, res:express.Response, next)=>{
   //Checking emailid from front-end
   const user:any = await User.findOne({ email: req.body.email });
   console.log("wrongs",user)
   if (user) {
     const OtpUser:any = await Otp.findOne({ email: req.body.email });
     if(OtpUser){
      console.log("wrongs",user)
       //generate OTP 
       let otpCode:any = Math.floor(Math.random() * 10000 + 1);
       //save OTP to database with expire time
      OtpUser.code = otpCode
      OtpUser.expiresIn= new Date().getTime() + 300 * 1000,
  
       await OtpUser.save();
       //send OTP to mail
     
       const mailOptions:any = {
         from: "sharmijayac@gmail.com",
         to: user.email,
         subject: "verify your email",
         html: `<p>Hello ${user.username}. Your OTP is ${OtpUser.code}`,
       };
       transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
           console.log(error);
         } else {
           console.log(info);
           console.log("Verification Mail sent");
         }
       });
       return res.status(200).json({message:"Success"})
     
    }
    } else {
      return res.status(400).json({message:"EmailId not yet registered with funtabulous"});
    }
}
//CHANGEPASSWORD
changePassword = async(req:express.Request, res:express.Response, next)=>{
     //Checking whether is there any OTP with that mail address
     let data:any = await Otp.findOne({ email: req.body.email, code: req.body.code });

     if (data) {
       let currentTime = new Date().getTime();
       let diff = data.expiresIn - currentTime;
       //if time expires OTP will not be valid
       if (diff < 0) {
         return res.status(400).json("error");
       } else {
       //if valid new password will be save.
         const user:any = await User.findOne({ email: req.body.email });
         const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
         user.password = hashedPassword;
         user.save();
         console.log("Success");
        return  res.status(200).json("Password Changed");
       }
     } else {
       return res.status(400).json({message:"Enter correct OTP"});
     }
}
  }
