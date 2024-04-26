import { Client, clientTypesEnum } from 'common-model';
export declare class CreateClientDto implements Client {
    name: string;
    type: clientTypesEnum;
}
