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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../Entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// //Post a new user
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, mobile, address, city } = req.body;
        //brcypt.hash is an async function, need await, returns promise<>
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = user_1.User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            address,
            city
        });
        yield newUser.save();
        res.json({ newUser });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//Get a user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const user = user_1.User.findOne({ where: { id: id } });
    res.json({ user });
}));
exports.default = router;
