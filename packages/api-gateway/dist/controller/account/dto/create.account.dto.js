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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountDto = void 0;
const common_model_1 = require("common-model");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAccountDto {
}
exports.CreateAccountDto = CreateAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the initial amount of money after you create the account',
        minimum: 0,
    }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the uuid string of this accounts bank',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "bankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the uuid string of this accounts owner',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type of currency that the account uses',
        example: 'USD',
    }),
    (0, class_validator_1.IsEnum)(common_model_1.currencyTypesEnum),
    __metadata("design:type", typeof (_a = typeof common_model_1.currencyTypesEnum !== "undefined" && common_model_1.currencyTypesEnum) === "function" ? _a : Object)
], CreateAccountDto.prototype, "currency", void 0);
//# sourceMappingURL=create.account.dto.js.map