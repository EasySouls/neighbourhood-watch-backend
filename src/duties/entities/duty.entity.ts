import { DutyType } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class Duty {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsEnum(DutyType)
  type: DutyType;

  // TODO: Create an owner field

  @IsString()
  @IsOptional()
  plateNumber?: string;

  @IsString()
  departmentId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
