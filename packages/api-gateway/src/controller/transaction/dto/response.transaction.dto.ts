import { Transaction, WithId } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTransactionDto implements Transaction, WithId {
  @ApiProperty({ description: 'UUID string of the record' })
  id: string;

  @ApiProperty({ description: 'amount of money in the transaction' })
  amount: number;

  @ApiProperty({ description: 'date and time when transaction was performed' })
  datetime: Date;

  @ApiProperty({ description: 'UUID string of the sender account' })
  from: string;

  @ApiProperty({ description: 'UUID string of the receiver account' })
  to: string;
}
