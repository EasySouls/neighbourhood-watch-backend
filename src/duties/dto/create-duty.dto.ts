import { OmitType } from '@nestjs/swagger';
import { Duty } from '../entities/duty.entity';

export class CreateDutyDto extends OmitType(Duty, ['id', 'createdAt', 'updatedAt'] as const) {}
