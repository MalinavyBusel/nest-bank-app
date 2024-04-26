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
exports.BankController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
let BankController = class BankController {
    constructor(tcpBankService) {
        this.tcpBankService = tcpBankService;
    }
    getById(_id) { }
    find() {
        return this.tcpBankService.send({ cmd: 'find-banks' }, '');
    }
    new(_createBankDto) { }
    update(_id, _updateBankDto) { }
    delete(_id) { }
};
exports.BankController = BankController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns bank',
        description: 'Returns bank with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target bank UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ResponseBankDto }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all banks filtered by condition',
        description: 'Returns all banks filtered by condition',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_1.ResponseBankDto] }),
    (0, common_1.Post)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BankController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creates new bank',
        description: 'Creates new bank',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateBankDto }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBankDto]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "new", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'updates a bank',
        description: 'updates a bank with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target bank UUID',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateBankDto }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBankDto]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes a bank',
        description: 'Deletes a bank with the same UUID and all its accounts',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target bank UUID',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "delete", null);
exports.BankController = BankController = __decorate([
    (0, swagger_1.ApiTags)('Bank API'),
    (0, common_1.Controller)('bank'),
    __param(0, (0, common_1.Inject)('BANKS')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BankController);
//# sourceMappingURL=bank.controller.js.map