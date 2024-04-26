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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const dto_2 = require("../transaction/dto");
const dto_3 = require("../account/dto");
let ClientController = class ClientController {
    getById(_id) { }
    getTransactions(_id) { }
    getAccounts(_id) { }
    find() { }
    new(_createClientDto) { }
    delete(_id) { }
};
exports.ClientController = ClientController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns client object',
        description: 'Returns client with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target client UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ResponseClientDto }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all clients transactions',
        description: 'Returns all transactions that was initiated by client with provided UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target client UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_2.ResponseTransactionDto] }),
    (0, common_1.Get)(':id/transactions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "getTransactions", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all clients accounts',
        description: 'Returns all accounts owned by client with provided UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target client UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_3.ResponseAccountDto] }),
    (0, common_1.Get)(':id/accounts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "getAccounts", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all clients filtered by condition',
        description: 'Returns all clients filtered by condition',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_1.ResponseClientDto] }),
    (0, common_1.Post)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creates new client',
        description: 'Creates new client and an initial account for it',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateClientDto }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "new", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes a client',
        description: 'Deletes a client with the same UUID and all its accounts',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target client UUID',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "delete", null);
exports.ClientController = ClientController = __decorate([
    (0, swagger_1.ApiTags)('Client API'),
    (0, common_1.Controller)('client')
], ClientController);
//# sourceMappingURL=client.controller.js.map