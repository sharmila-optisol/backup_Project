"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
    },
    rating: {
        type: String,
    },
    comment: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.ProductSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, },
    img: { type: String },
    categories: { type: Array },
    size: { type: Array },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0,
    },
    color: { type: Array },
    price: { type: Number },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", exports.ProductSchema);
//# sourceMappingURL=Product.js.map