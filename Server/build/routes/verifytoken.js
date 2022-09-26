"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                res.status(403).json("token is not valid");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("you are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed to do that");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed to do that");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
//# sourceMappingURL=verifytoken.js.map