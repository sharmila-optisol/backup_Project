"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerification = void 0;
const mongoose_1 = require("mongoose");
const userVerificationSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    uniqueString: { type: String },
    isVerified: { type: Boolean },
    emailToken: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date },
});
exports.userVerification = mongoose_1.default.model("userVerification", userVerificationSchema);
//# sourceMappingURL=userVerify.js.map