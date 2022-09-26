"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyToken_1 = require("../Middleware/VerifyToken");
const CartController_1 = require("../controller/CartController");
const CartController = new CartController_1.cartController();
const router = (0, express_1.Router)();
//CREATE
router.post('/', VerifyToken_1.verifyToken, CartController.createCart);
//UPDATE
router.put('/:id', VerifyToken_1.verifyTokenAndAuthorization, CartController.updateCart);
// //DELETE
router.delete('/:id', VerifyToken_1.verifyTokenAndAuthorization, CartController.deleteCart);
// //GET USER CART
router.get('/find/:userId', VerifyToken_1.verifyTokenAndAuthorization, CartController.getUserCart);
//GET ALL 
router.get('/', VerifyToken_1.verifyTokenAndAdmin, CartController.getAllCart);
exports.default = router;
//# sourceMappingURL=cart.js.map