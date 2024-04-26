export interface Client {
  name: string;
  type: clientTypesEnum;
}

export enum clientTypesEnum {
  ENTITY = 'entity',
  INDIVIDUAL = 'individual',
}
