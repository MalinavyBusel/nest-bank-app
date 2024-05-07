import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsOptional, Max, Min } from 'class-validator';
import { Bank } from 'common-model';

export class UpdateBankDto implements Omit<Bank, 'id'> {
  @ApiPropertyOptional({
    description:
      'the comission percent for transactions where entity client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  @IsOptional()
  entityCommission: number;

  @ApiPropertyOptional({
    description:
      'the comission percent for transactions where individual client sends money to another bank account',
  })
  @Min(0)
  @Max(100)
  @IsOptional()
  individualCommission: number;

  @ApiPropertyOptional({ description: 'the name of the bank' })
  @IsAlpha()
  @IsOptional()
  name: string;
}
