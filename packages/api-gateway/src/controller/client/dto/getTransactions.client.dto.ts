import { IsDateString, IsOptional } from 'class-validator';

export class GetTransactionsDto {
  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;
}
