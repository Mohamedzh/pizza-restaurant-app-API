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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const orderLine_1 = require("./orderLine");
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Order.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderLine_1.OrderLine, orderline => orderline.order),
    __metadata("design:type", Array)
], Order.prototype, "orderlines", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "completed", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
exports.Order = Order;
