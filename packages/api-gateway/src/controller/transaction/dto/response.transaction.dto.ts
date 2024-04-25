import { Transaction, WithId } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTransactionDto implements Transaction, WithId {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  datetime: Date;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;
}
