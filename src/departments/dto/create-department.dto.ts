import { OmitType } from '@nestjs/swagger';
import { Department } from '../entities/department.entity';

export class CreateDepartmentDto extends OmitType(Department, ['id', 'createdAt', 'updatedAt'] as const) {}
