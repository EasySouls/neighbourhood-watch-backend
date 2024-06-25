import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class Department {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
