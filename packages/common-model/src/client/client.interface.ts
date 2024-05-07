export interface Client {
  name: string;
  type: clientTypesEnum;
  email: string;
  password: string;
}

export enum clientTypesEnum {
  ENTITY = 'entity',
  INDIVIDUAL = 'individual',
}
