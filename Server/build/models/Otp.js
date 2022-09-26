"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.default.Schema({
    email: { type: String },
    code: { type: String },
    expiresIn: { type: Number },
    timeStamps: { type: Boolean, default: true }
});
exports.Otp = mongoose_1.default.model("Otp", OtpSchema);
//# sourceMappingURL=Otp.js.map