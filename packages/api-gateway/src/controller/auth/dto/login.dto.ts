import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'clients email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'clients password' })
  @IsStrongPassword()
  password: string;
}
