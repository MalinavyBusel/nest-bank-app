import { IsAlpha, Max, Min } from 'class-validator';
import { Bank } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto implements Omit<Bank, 'id'> {
  @ApiProperty({
    description:
      'the commission percent for transactions where entity client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  entityCommission: number;

  @ApiProperty({
    description:
      'the commission percent for transactions where individual client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  individualCommission: number;

  @ApiProperty({
    description: 'the name of the bank',
  })
  @IsAlpha()
  name: string;
}
