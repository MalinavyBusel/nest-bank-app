import { Client, clientTypes } from 'common-model';
export declare class CreateClientDto implements Client {
    name: string;
    type: (typeof clientTypes)[number];
}
