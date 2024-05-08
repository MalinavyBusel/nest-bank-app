import { Transaction } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTransactionDto implements Transaction {
  @ApiProperty({ description: 'UUID string of the record' })
  id: string;

  @ApiProperty({ description: 'amount of money in the transaction' })
  amount: number;

  @ApiProperty({
    description: 'date and time when transaction was performed',
    example: 'YYYY-MM-DD HH:mm:ss',
  })
  datetime: string;

  @ApiProperty({ description: 'UUID string of the sender account' })
  fromId: string;

  @ApiProperty({ description: 'UUID string of the receiver account' })
  toId: string;
}
