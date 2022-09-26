"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    isVerified: { type: Boolean },
    emailToken: { type: String },
    isAdmin: { type: Boolean, default: false },
    img: { type: String },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", exports.UserSchema);
//# sourceMappingURL=User.js.map