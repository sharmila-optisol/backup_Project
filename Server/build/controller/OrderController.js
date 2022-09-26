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
exports.orderController = void 0;
const Order_1 = require("../models/Order");
class orderController {
    constructor() {
        //CREATE
        this.createOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newOrder = new Order_1.Order(req.body);
            console.log("new:", newOrder);
            try {
                const savedOrder = yield newOrder.save();
                res.status(200).json(savedOrder);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //UPDATE
        this.updateOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedOrder = yield Order_1.Order.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedOrder);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //DELETE
        this.deleteOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Order_1.Order.findByIdAndDelete(req.params.id);
                res.status(200).json("order has been deleted...");
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET USER ORDER
        this.getUserOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.Order.find({ userId: req.params.userId });
                res.status(200).json(orders);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET ALL ORDER
        this.getAllOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.Order.find();
                res.status(200).json(orders);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.orderController = orderController;
//# sourceMappingURL=OrderController.js.map