import { CreateAccountDto, UpdateAccountDto } from './dto';
export declare class AccountController {
    getById(_id: string): void;
    find(): void;
    new(_createAccountDto: CreateAccountDto): void;
    update(_id: string, _updateAccountDto: UpdateAccountDto): void;
    delete(_id: string): void;
}
