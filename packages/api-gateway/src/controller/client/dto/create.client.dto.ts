import { Client, clientTypesEnum } from 'common-model';
import { IsAlpha, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto implements Client {
  @ApiProperty({
    description: 'the name of the client',
  })
  @IsAlpha()
  name: string;

  @ApiProperty({
    description: 'type of the client - entity of individual',
  })
  @IsEnum(clientTypesEnum)
  type: clientTypesEnum;
}
