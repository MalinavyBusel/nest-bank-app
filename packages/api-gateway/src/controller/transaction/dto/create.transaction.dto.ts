import { Transaction } from 'common-model';
import { IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto implements Omit<Transaction, 'datetime'> {
  @ApiProperty({
    description: 'the amount of money being sent to the receiver',
  })
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'the uuid string of the sender',
  })
  @IsUUID()
  from: string;

  @ApiProperty({
    description: 'the uuid string of the receiver',
  })
  @IsUUID()
  to: string;
}
