import { Client, clientTypesEnum } from 'common-model';
import { IsAlpha, IsEmail, IsEnum, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto implements Client {
  @ApiProperty({
    description: 'the name of the client',
  })
  @IsAlpha()
  name: string;

  @ApiProperty({
    description: 'type of the client - entity of individual',
    example: 'entity',
  })
  @IsEnum(clientTypesEnum)
  type: clientTypesEnum;

  @ApiProperty({ description: 'clients email', example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'clients password', example: 'STR0N9pa$$w0r6' })
  @IsStrongPassword()
  password: string;
}
