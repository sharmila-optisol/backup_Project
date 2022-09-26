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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const VerifyToken_1 = require("../Middleware/VerifyToken");
const express_validator_1 = require("express-validator");
const UserController_1 = require("../controller/UserController");
const UserController = new UserController_1.userController();
const router = (0, express_1.Router)();
//UPDATE
router.put('/:id', VerifyToken_1.verifyTokenAndAuthorization, [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Invalid Password"),
    (0, express_validator_1.body)("username").isAlpha().withMessage("Invalid Name"),
], UserController.updateUser);
//DELETE
router.post("/:id", VerifyToken_1.verifyTokenAndAuthorization, UserController.deleteUser);
//GET USER
router.get("/find/:id", VerifyToken_1.verifyTokenAndAdmin, UserController.getUser);
//GET ALL USER
router.get("/", VerifyToken_1.verifyTokenAndAdmin, UserController.getAllUser);
//GET USER STATUS
router.get("/status", VerifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = yield User_1.User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: {
                    month: { $month: "$createdAt" },
                } },
            { $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                } }
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map