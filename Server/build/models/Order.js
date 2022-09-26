"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.default.Schema({
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", OrderSchema);
//# sourceMappingURL=Order.js.map