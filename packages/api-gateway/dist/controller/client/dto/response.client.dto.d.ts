import { Client, clientTypes, WithId } from 'common-model';
export declare class ResponseClientDto implements Client, WithId {
    id: string;
    name: string;
    type: (typeof clientTypes)[number];
}
