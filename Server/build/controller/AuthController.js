"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const User_1 = require("../models/User");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const Transporter_1 = require("../Middleware/Transporter");
const jwt = require("jsonwebtoken");
const Otp_1 = require("../models/Otp");
class authController {
    constructor() {
        this.userLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            try {
                const user = yield User_1.User.findOne({ username });
                if (!user)
                    return res.status(401).json("Wrong Credentials");
                const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
                const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                console.log("use", orginalPassword);
                if (orginalPassword !== req.body.password)
                    return res.status(401).json("Wrong Credentials");
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, process.env.JWT_SECRET, {
                    expiresIn: "10d"
                });
                const _a = user._doc, { password } = _a, others = __rest(_a, ["password"]);
                return res.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
            }
            catch (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred ."
                });
            }
        });
        //register                  
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const existingUser = yield User_1.User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: "sorryrrr" });
                }
                const newUser = new User_1.User({
                    username: username,
                    email: email,
                    password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
                    isVerified: false,
                    emailToken: crypto.randomBytes(64).toString("hex"),
                });
                const savedUser = yield newUser.save();
                const mailOptions = {
                    from: "sharmijayac@gmail.com",
                    to: newUser.email,
                    subject: "Verify your email address",
                    html: `<p>Hello ${newUser.username}! A Message from online shopping
           !.Please Verify your email address to complete the signup process and login to your account</p>
        <p>press here <a href="http://${req.headers.host}/api/auth/verify-email?token=${newUser.emailToken}"> here</a> to verify your mailId. </p>`,
                };
                Transporter_1.transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("Verification Mail sent");
                    return res.status(400).json({ message: "Verification Mail sent" });
                });
                return res.status(201).json(savedUser);
            }
            catch (err) {
                return res.json(err);
            }
        });
        //googlelogin
        this.googleLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, token, googleId, } = req.body;
            try {
                const existingUser = yield User_1.User.findOne({ email });
                if (existingUser && existingUser.isVerified) {
                    res.status(400).json({ message: "Email Address already exists" });
                }
                else if (existingUser) {
                    res.status(200).json({ result: existingUser, token });
                }
                if (!existingUser) {
                    const result = yield User_1.User.create({
                        email,
                        username: name,
                        googleId,
                    });
                    res.status(200).json({ result, token });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        //emailVerify
        this.emailVerify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //getting token from mail verification
                const token = req.query.token;
                //Checking if there any emailToken with token
                const user = yield User_1.User.findOne({ emailToken: token });
                if (user) {
                    //assign value to database as verified
                    user.emailToken = null;
                    user.isVerified = true;
                    yield user.save();
                    //redirect to login page after verify email
                    return res.redirect("http://localhost:3000/login");
                }
                else {
                    console.log("Email is not verified");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        //otp 
        this.otp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //Checking emailid from front-end
            const user = yield User_1.User.findOne({ email: req.body.email });
            console.log("wrongs", user);
            if (user) {
                const OtpUser = yield Otp_1.Otp.findOne({ email: req.body.email });
                if (OtpUser) {
                    console.log("wrongs", user);
                    //generate OTP 
                    let otpCode = Math.floor(Math.random() * 10000 + 1);
                    //save OTP to database with expire time
                    OtpUser.code = otpCode;
                    OtpUser.expiresIn = new Date().getTime() + 300 * 1000,
                        yield OtpUser.save();
                    //send OTP to mail
                    const mailOptions = {
                        from: "sharmijayac@gmail.com",
                        to: user.email,
                        subject: "verify your email",
                        html: `<p>Hello ${user.username}. Your OTP is ${OtpUser.code}`,
                    };
                    Transporter_1.transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log(info);
                            console.log("Verification Mail sent");
                        }
                    });
                    return res.status(200).json({ message: "Success" });
                }
            }
            else {
                return res.status(400).json({ message: "EmailId not yet registered with funtabulous" });
            }
        });
        //CHANGEPASSWORD
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //Checking whether is there any OTP with that mail address
            let data = yield Otp_1.Otp.findOne({ email: req.body.email, code: req.body.code });
            if (data) {
                let currentTime = new Date().getTime();
                let diff = data.expiresIn - currentTime;
                //if time expires OTP will not be valid
                if (diff < 0) {
                    return res.status(400).json("error");
                }
                else {
                    //if valid new password will be save.
                    const user = yield User_1.User.findOne({ email: req.body.email });
                    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
                    user.password = hashedPassword;
                    user.save();
                    console.log("Success");
                    return res.status(200).json("Password Changed");
                }
            }
            else {
                return res.status(400).json({ message: "Enter correct OTP" });
            }
        });
    }
}
exports.authController = authController;
//# sourceMappingURL=AuthController.js.map