"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLine = void 0;
const typeorm_1 = require("typeorm");
const order_1 = require("./order");
const product_1 = require("./product");
let OrderLine = class OrderLine extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderLine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderLine.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], OrderLine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    }),
    __metadata("design:type", Date)
], OrderLine.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, product => product.orderlines),
    __metadata("design:type", product_1.Product)
], OrderLine.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_1.Order, order => order.orderlines),
    __metadata("design:type", order_1.Order)
], OrderLine.prototype, "order", void 0);
OrderLine = __decorate([
    (0, typeorm_1.Entity)()
], OrderLine);
exports.OrderLine = OrderLine;
