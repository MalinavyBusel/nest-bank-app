import { Account, currencyTypesEnum } from 'common-model';
import { IsEnum, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto implements Account {
  @ApiProperty({
    description: 'the initial amount of money after you create the account',
    minimum: 0,
  })
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'the uuid string of this accounts bank',
  })
  @IsUUID()
  bankId: string;

  @ApiProperty({
    description: 'the uuid string of this accounts owner',
  })
  @IsUUID()
  clientId: string;

  @ApiProperty({
    description: 'type of currency that the account uses',
    example: 'USD',
  })
  @IsEnum(currencyTypesEnum)
  currency: currencyTypesEnum;
}
