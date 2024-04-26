import { Client, clientTypesEnum, WithId } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseClientDto implements Client, WithId {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: clientTypesEnum;
}
