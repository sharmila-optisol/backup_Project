"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
// node mailer
exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharmijayac@gmail.com",
        pass: "vmcxhzvfmbrklczy"
    }
    // TESTING
});
exports.transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for Messages");
        console.log("Success");
    }
});
//# sourceMappingURL=Transporter.js.map