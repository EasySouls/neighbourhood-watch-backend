import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  authCode: number;
}
