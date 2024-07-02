import { IsEmail, IsNumber } from 'class-validator';

export class ValidateCodeDto {
  @IsNumber({})
  code: number;

  @IsEmail()
  email: string;
}
