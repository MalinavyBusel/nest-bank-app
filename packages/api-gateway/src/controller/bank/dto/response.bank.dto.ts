import { Bank, WithId } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBankDto implements Bank, WithId {
  @ApiProperty()
  id: string;

  @ApiProperty()
  entityComission: number;

  @ApiProperty()
  individualComission: number;

  @ApiProperty()
  name: string;
}
