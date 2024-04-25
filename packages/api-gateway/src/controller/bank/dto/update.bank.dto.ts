import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsOptional, Max, Min } from 'class-validator';
import { Bank } from 'common-model';

export class UpdateBankDto implements Bank {
  @ApiPropertyOptional({
    description:
      'the comission percent for transactions where entity client sends money to another banks account',
  })
  @Min(0)
  @Max(100)
  @IsOptional()
  entityComission: number;

  @ApiPropertyOptional({
    description:
      'the comission percent for transactions where individual client sends money to another banks account',
  })
  @Min(0)
  @Max(100)
  @IsOptional()
  individualComission: number;

  @ApiPropertyOptional({ description: 'the name of the bank' })
  @IsAlpha()
  @IsOptional()
  name: string;
}
