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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
let AccountController = class AccountController {
    getById(_id) { }
    find() { }
    new(_createAccountDto) { }
    update(_id, _updateAccountDto) { }
    delete(_id) { }
};
exports.AccountController = AccountController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns account',
        description: 'Returns account with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target account UUID',
    }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.ResponseAccountDto }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns all accounts filtered by condition',
        description: 'Returns all accounts filtered by condition',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [dto_1.ResponseAccountDto] }),
    (0, common_1.Post)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Creates new account',
        description: 'Creates new account and returns its id',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateAccountDto }),
    (0, swagger_1.ApiOkResponse)({ type: String }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAccountDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "new", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates an account',
        description: 'Updates an account with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target account UUID',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateAccountDto }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAccountDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes an account',
        description: 'Deletes an account with the same UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'the string representation of the target account UUID',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "delete", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Account API'),
    (0, common_1.Controller)('account')
], AccountController);
//# sourceMappingURL=account.controller.js.map