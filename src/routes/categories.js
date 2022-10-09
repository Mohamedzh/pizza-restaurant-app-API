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
const category_1 = require("../Entities/category");
const router = (0, express_1.Router)();
//Post a new category
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newCat = category_1.Category.create({
            name
        });
        console.log(newCat);
        yield category_1.Category.save(newCat);
        res.json({ newCat });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Get all categories
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find({ relations: { products: true } });
        res.json({ categories });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;