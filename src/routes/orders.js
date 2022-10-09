"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../Entities/order");
const product_1 = require("../Entities/product");
const typeorm_1 = require("typeorm");
const orderLine_1 = require("../Entities/orderLine");
const router = (0, express_1.Router)();
//Post a new order
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mobile, address, city, productIds } = req.body;
        const products = yield product_1.Product.find({ where: { id: (0, typeorm_1.In)(productIds.map((product) => product.id) || []) } });
        console.log(products);
        const newOrder = order_1.Order.create({
            name, mobile, address, city
        });
        // console.log(newOrder)
        yield newOrder.save();
        const order = newOrder;
        for (let i = 0; i < products.length; i++) {
            let product = productIds[i].id;
            console.log(product);
            let quantity = productIds[i].quantity;
            console.log(order, product, quantity);
            const newOrderLine = orderLine_1.OrderLine.create({ order, product, quantity });
            yield newOrderLine.save();
            console.log(newOrderLine);
        }
        res.json({ newOrder });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
//Get an order
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield order_1.Order.findOne({ where: { id: id }, relations: { orderlines: { product: true } } });
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Get all orders
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.Order.find({ relations: { orderlines: { product: true } } });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Update order status
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield order_1.Order.findOne({ where: { id } });
        order.completed = true;
        yield (order === null || order === void 0 ? void 0 : order.save());
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
