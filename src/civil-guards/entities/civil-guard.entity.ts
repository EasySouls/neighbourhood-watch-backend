import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CivilGuard {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  accountId: string;

  @IsString()
  departmentId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
