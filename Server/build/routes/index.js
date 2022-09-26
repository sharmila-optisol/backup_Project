"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../routes/user");
const auth_1 = require("../routes/auth");
const product_1 = require("../routes/product");
const cart_1 = require("../routes/cart");
const order_1 = require("../routes/order");
const stripe_1 = require("../routes/stripe");
const app = express();
app.use(express.json());
app.use(auth_1.default);
app.use("/users", user_1.default);
app.use("/products", product_1.default);
app.use("/carts", cart_1.default);
app.use("/orders", order_1.default);
app.use("/stripe", stripe_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map