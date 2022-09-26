"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyToken_1 = require("../Middleware/VerifyToken");
const ProductController_1 = require("../controller/ProductController");
const ProductController = new ProductController_1.productController();
const router = (0, express_1.Router)();
//CREATE
router.post("/", VerifyToken_1.verifyTokenAndAdmin, ProductController.createProduct);
//UPDATE
router.put('/:id', VerifyToken_1.verifyTokenAndAdmin, ProductController.updateProduct);
// //DELETE
router.delete('/:id', VerifyToken_1.verifyTokenAndAdmin, ProductController.deleteProduct);
// //GET PRODUCT
router.get('/find/:id', ProductController.getProduct);
// //GET ALL PRODUCT
router.get('/', ProductController.getAllProduct);
//search
router.get("/search", ProductController.search);
//GET REVIEW
router.post("/:id/review", ProductController.review);
exports.default = router;
//# sourceMappingURL=product.js.map