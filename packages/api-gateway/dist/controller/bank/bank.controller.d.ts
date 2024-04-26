import { CreateBankDto, UpdateBankDto } from './dto';
export declare class BankController {
    getById(_id: string): void;
    find(): void;
    new(_createBankDto: CreateBankDto): void;
    update(_id: string, _updateBankDto: UpdateBankDto): void;
    delete(_id: string): void;
}
