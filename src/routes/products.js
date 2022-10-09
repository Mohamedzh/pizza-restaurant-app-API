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
const product_1 = require("../Entities/product");
const router = (0, express_1.Router)();
//Get all products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.find({ relations: { category: true } });
    res.json({ products });
}));
//Post a new product
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, popular, price, description, imageUrl } = req.body;
        const item = product_1.Product.create({
            name,
            category,
            popular,
            price,
            description,
            imageUrl
        });
        yield product_1.Product.save(item);
        res.json({ item });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Update a product to popular/unpopular
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentId = +req.params.id;
        const item = yield product_1.Product.findOne({ where: { id: currentId } });
        const { popular } = req.body;
        const updatedItem = yield product_1.Product.update(item.id, { popular: popular });
        res.status(200).json({ updatedItem });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Remove a product
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentId = +(req.params.id);
        const item = yield product_1.Product.findOne({ where: { id: currentId } });
        yield product_1.Product.remove(item);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
