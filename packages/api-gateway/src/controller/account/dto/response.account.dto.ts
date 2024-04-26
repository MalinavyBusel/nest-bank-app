import { Account, WithId, currencyTypesEnum } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDto implements Account, WithId {
  @ApiProperty({
    description: 'UUID string of the record',
  })
  id: string;

  @ApiProperty({
    description: 'how much money there is on the account',
  })
  amount: number;

  @ApiProperty({
    description: 'UUID string of the accounts parent bank',
  })
  bankId: string;

  @ApiProperty({
    description: 'UUID string of teh accounts owner',
  })
  clientId: string;

  @ApiProperty({
    description: 'type of the currency the account is using',
  })
  currency: currencyTypesEnum;
}
