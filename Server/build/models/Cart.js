"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
}, { timestamps: true });
exports.Cart = mongoose_1.default.model("Cart", CartSchema);
//# sourceMappingURL=Cart.js.map