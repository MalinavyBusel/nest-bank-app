export interface Client {
    name: string;
    type: clientTypesEnum;
}
export declare enum clientTypesEnum {
    ENTITY = "entity",
    INDIVIDUAL = "individual"
}
