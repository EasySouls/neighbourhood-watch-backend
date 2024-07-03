import { Role } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CivilGuard {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  departmentId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
