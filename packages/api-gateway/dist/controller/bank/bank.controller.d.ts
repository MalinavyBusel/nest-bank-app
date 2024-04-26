import { CreateBankDto, UpdateBankDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class BankController {
    private readonly tcpBankService;
    constructor(tcpBankService: ClientProxy);
    getById(_id: string): void;
    find(): import("rxjs").Observable<any>;
    new(_createBankDto: CreateBankDto): void;
    update(_id: string, _updateBankDto: UpdateBankDto): void;
    delete(_id: string): void;
}
