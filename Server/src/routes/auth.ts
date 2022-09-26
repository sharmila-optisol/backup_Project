import {Router} from 'express'
import {body } from "express-validator";
import { authController } from '../controller/AuthController';
const AuthController = new authController();

const router =Router();

//REGISTER
router.post(
  "/register",        
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
    body("username").isAlpha().withMessage("Invalid Name"),
  ],
  AuthController.register
);
  //LOGIN
router.post(
  "/login",
  [
    body("username").isAlpha().withMessage("Invalid Name"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }),
  ],
  AuthController.userLogin
);


//google login
router.post(
  "/googleLogin",[
    body("email").isEmail().withMessage("Invalid Email"),
  ],
  AuthController.googleLogin
)
//email verify
router.post(
  "/emailVerify",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }),
  ],
  AuthController.emailVerify
)
//otp
router.post(
  "/otp",
  [
    body("email").isEmail().withMessage("Invalid Email"),
  ],
  AuthController.otp
)
//change password
router.post(
  "/changepassword",
  [
    body("otp").isNumeric().withMessage("Otp must be a number"),
    body("password")
      .exists()
      .isLength({ min: 6 })
      .withMessage("Reset Password required"),
    body("cnf_password")
      .exists()
      .custom((value, { req }) => {
        if (
          value !== req.body.password &&
          value.length !== req.body.password.length
        ) {
          throw new Error("Both Password Field must same");
        }
        return true;
      }),
  ],
  AuthController.changePassword
)

  
export default router;