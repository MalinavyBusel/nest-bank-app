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
exports.CreateClientDto = void 0;
const common_model_1 = require("common-model");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the name of the client',
    }),
    (0, class_validator_1.IsAlpha)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type of the client - entity of individual',
    }),
    (0, class_validator_1.IsEnum)(common_model_1.clientTypesEnum),
    __metadata("design:type", typeof (_a = typeof common_model_1.clientTypesEnum !== "undefined" && common_model_1.clientTypesEnum) === "function" ? _a : Object)
], CreateClientDto.prototype, "type", void 0);
//# sourceMappingURL=create.client.dto.js.map