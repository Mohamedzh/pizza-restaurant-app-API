"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const product_1 = require("./Entities/product");
const order_1 = require("./Entities/order");
const orderLine_1 = require("./Entities/orderLine");
const category_1 = require("./Entities/category");
// import { User } from "./Entities/user";
(0, dotenv_1.config)();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.pghost,
    port: Number(process.env.pgport),
    username: process.env.pguser,
    password: process.env.pgpassword,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [product_1.Product, order_1.Order, orderLine_1.OrderLine, category_1.Category],
    migrations: ["migration/*.ts"],
    subscribers: [],
});
exports.default = AppDataSource;
