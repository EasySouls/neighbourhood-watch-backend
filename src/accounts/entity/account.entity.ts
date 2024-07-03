import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class Account {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
