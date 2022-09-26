"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controller/AuthController");
const AuthController = new AuthController_1.authController();
const router = (0, express_1.Router)();
//REGISTER
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Invalid Password"),
    (0, express_validator_1.body)("username").isAlpha().withMessage("Invalid Name"),
], AuthController.register);
//LOGIN
router.post("/login", [
    (0, express_validator_1.body)("username").isAlpha().withMessage("Invalid Name"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }),
], AuthController.userLogin);
//google login
router.post("/googleLogin", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
], AuthController.googleLogin);
//email verify
router.post("/emailVerify", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }),
], AuthController.emailVerify);
//otp
router.post("/otp", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
], AuthController.otp);
//change password
router.post("/changepassword", [
    (0, express_validator_1.body)("otp").isNumeric().withMessage("Otp must be a number"),
    (0, express_validator_1.body)("password")
        .exists()
        .isLength({ min: 6 })
        .withMessage("Reset Password required"),
    (0, express_validator_1.body)("cnf_password")
        .exists()
        .custom((value, { req }) => {
        if (value !== req.body.password &&
            value.length !== req.body.password.length) {
            throw new Error("Both Password Field must same");
        }
        return true;
    }),
], AuthController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map