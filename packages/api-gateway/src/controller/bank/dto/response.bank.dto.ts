import { Bank } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBankDto implements Bank {
  @ApiProperty({ description: 'UUID string of the record' })
  id: string;

  @ApiProperty({
    description:
      'how much money in % is the commission for entity accounts when sending transaction to account of another bank',
  })
  entityCommission: number;

  @ApiProperty({
    description:
      'how much money in % is the commission for individual accounts when sending transaction to account of another bank',
  })
  individualCommission: number;

  @ApiProperty({
    description: 'name of the bank',
  })
  name: string;
}
