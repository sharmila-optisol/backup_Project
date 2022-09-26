"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyToken_1 = require("../Middleware/VerifyToken");
const OrderController_1 = require("../controller/OrderController");
const OrderController = new OrderController_1.orderController();
const router = (0, express_1.Router)();
//CREATE
router.post("/", VerifyToken_1.verifyToken, OrderController.createOrder);
//UPDATE
router.put('/:id', VerifyToken_1.verifyTokenAndAdmin, OrderController.updateOrder);
// //DELETE
router.delete('/:id', VerifyToken_1.verifyTokenAndAdmin, OrderController.deleteOrder);
// //GET USER ORDERS
router.get('/find/:id', VerifyToken_1.verifyTokenAndAuthorization, OrderController.getUserOrder);
// GET ALL ORDERS
router.get('/', VerifyToken_1.verifyTokenAndAdmin, OrderController.getAllOrder);
exports.default = router;
//# sourceMappingURL=order.js.map