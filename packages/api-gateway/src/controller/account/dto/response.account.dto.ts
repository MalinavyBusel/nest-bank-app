import { Account, WithId, currencyTypesEnum } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDto implements Account, WithId {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  bankId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  currency: currencyTypesEnum;
}
