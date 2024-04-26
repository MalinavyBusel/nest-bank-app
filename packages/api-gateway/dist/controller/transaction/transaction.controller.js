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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
let TransactionController = class TransactionController {
    getById(_id) { }
    find() { }
    new(_createTransactionDto) { }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns transaction object',
        description: 'Returns transaction with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target transaction UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ResponseTransactionDto }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all transactions  filtered by condition',
        description: 'Returns all transactions filtered by condition',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_1.ResponseTransactionDto] }),
    (0, common_1.Post)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creates new transaction',
        description: 'Creates new transaction',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateTransactionDto }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "new", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transaction API'),
    (0, common_1.Controller)('transaction')
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map