import { Client, clientTypesEnum } from 'common-model';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseClientDto implements Client {
  @ApiProperty({ description: 'UUID string of the record' })
  id: string;

  @ApiProperty({ description: 'name of the client' })
  name: string;

  @ApiProperty({ description: 'type of the client - entity or individual' })
  type: clientTypesEnum;
}
