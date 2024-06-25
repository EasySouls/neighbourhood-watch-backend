import { OmitType } from '@nestjs/swagger';

import { CivilGuard } from '../entities/civil-guard.entity';

export class CreateCivilGuardDto extends OmitType(CivilGuard, ['id', 'createdAt', 'updatedAt'] as const) {}
