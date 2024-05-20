export interface Client {
  name: string;
  type: clientTypesEnum;
  email: string;
  password: string;
  // there is also refreshToken field, but it is needed only in auth, so it is only declared in the entity
}

export enum clientTypesEnum {
  ENTITY = 'entity',
  INDIVIDUAL = 'individual',
}
