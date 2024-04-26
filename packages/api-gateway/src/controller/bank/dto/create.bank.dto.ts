import { IsAlpha, Max, Min } from 'class-validator';
import { Bank } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto implements Omit<Bank, 'id'> {
  @ApiProperty({
    description:
      'the comission percent for transactions where entity client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  entityComission: number;

  @ApiProperty({
    description:
      'the comission percent for transactions where individual client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  individualComission: number;

  @ApiProperty({
    description: 'the name of the bank',
  })
  @IsAlpha()
  name: string;
}
