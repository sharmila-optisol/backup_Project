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
exports.productController = void 0;
const Product_1 = require("../models/Product");
class productController {
    constructor() {
        //CREATE
        this.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newProduct = new Product_1.Product(req.body);
            try {
                const savedProduct = yield newProduct.save();
                res.status(200).json(savedProduct);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //UPDATE
        this.updateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req:", req.params.id, req.body);
                const existingProduct = yield Product_1.Product.findById(req.params.id);
                // console.log("pdt",existingProduct)
                existingProduct.title = req.body.title ? req.body.title : existingProduct.title;
                existingProduct.desc = req.body.desc ? req.body.desc : existingProduct.desc;
                existingProduct.categories = req.body.categories ? req.body.categories : existingProduct.categories;
                existingProduct.img = req.body.img ? req.body.img : existingProduct.img;
                existingProduct.price = req.body.price ? req.body.price : existingProduct.price;
                const updatedProduct = yield Product_1.Product.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedProduct);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //DELETE
        this.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Product_1.Product.findByIdAndDelete(req.params.id);
                res.status(200).json("product has been deleted...");
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET PRODUCT
        this.getProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.Product.findById(req.params.id);
                res.status(200).json(product);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //GET ALL PRODUCT
        this.getAllProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const qNew = req.query.new;
            const qCatergory = req.query.catergory;
            try {
                let products;
                if (qNew) {
                    products = yield Product_1.Product.find().sort({ createdAt: -1 }).limit(1);
                }
                else if (qCatergory) {
                    products = yield Product_1.Product.find({ categories: {
                            $in: [qCatergory],
                        },
                    });
                }
                else {
                    products = yield Product_1.Product.find();
                }
                res.status(200).json(products);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        //search
        this.search = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const product = req.query.search;
            console.log(req.query);
            const products = yield Product_1.Product.find({ title: { $regex: product, $options: '$i' } });
            if (products.length > 0) {
                return res.status(200).json({ products, categories: products[0].categories[1] });
            }
            return null;
        });
        //review
        this.review = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { rating, comment } = req.body;
            const product = yield Product_1.Product.findById(req.params.id);
            console.log(product);
            if (product) {
                const alreadyReviewed = product.reviews.find((r) => { var _a; return r.user === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id); });
                if (alreadyReviewed) {
                    return res.status(400).json("already reviewed");
                }
                console.log(alreadyReviewed);
                const review = {
                    name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username,
                    rating: Number(rating),
                    comment,
                    user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                };
                console.log(review);
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                yield product.save();
                return res.status(201).json({ message: "message reviewed" });
            }
            else {
                return res.status(404).json("eror");
            }
        });
    }
}
exports.productController = productController;
//# sourceMappingURL=ProductController.js.map