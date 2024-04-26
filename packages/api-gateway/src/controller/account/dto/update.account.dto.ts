import { Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiPropertyOptional({
    description: 'how much money will be credited to / written off account',
  })
  @Min(0)
  amount: number;
}
