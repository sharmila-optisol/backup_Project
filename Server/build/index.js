"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const mongoose_1 = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const index_1 = require("./routes/index");
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
//establish the database connection.
exports.app = express();
const port = 4000 || +process.env.PORT;
mongoose_1.default.connect(process.env.DATABASE_URL).then(() => console.log("db connetion sucpcessful")).catch((err) => {
    console.log(err);
});
exports.app.use(express.json());
exports.app.use(cors());
exports.app.use(index_1.default);
exports.app.use((req, res, next) => {
    console.log("Middle Ware");
    next();
});
exports.app.listen(port, () => {
    console.log("backend is running" + port);
});
//# sourceMappingURL=index.js.map