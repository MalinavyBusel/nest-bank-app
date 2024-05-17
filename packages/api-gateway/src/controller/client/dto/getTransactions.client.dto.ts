import { IsDateString, IsOptional } from 'class-validator';

export class GetTransactionsDto {
  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsOptional()
  take: number;

  @IsOptional()
  skip: number;
}
