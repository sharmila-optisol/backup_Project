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
exports.cartController = void 0;
const Cart_1 = require("../models/Cart");
class cartController {
    constructor() {
        //CREATE
        this.createCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newCart = new Cart_1.Cart(req.body);
            try {
                const savedCart = yield newCart.save();
                res.status(200).json(savedCart);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //UPDATE
        this.updateCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCart = yield Cart_1.Cart.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedCart);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //DELETE
        this.deleteCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Cart_1.Cart.findByIdAndDelete(req.params.id);
                res.status(200).json("cart has been deleted...");
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET USER CART
        this.getUserCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.findOne({ userId: req.params.userId });
                res.status(200).json(cart);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET ALL CART
        this.getAllCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield Cart_1.Cart.find();
                res.status(200).json(carts);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.cartController = cartController;
//# sourceMappingURL=CartController.js.map