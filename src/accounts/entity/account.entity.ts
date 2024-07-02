import { Role } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

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

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
