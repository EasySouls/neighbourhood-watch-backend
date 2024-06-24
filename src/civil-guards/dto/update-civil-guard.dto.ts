import { PartialType } from '@nestjs/swagger';
import { CreateCivilGuardDto } from './create-civil-guard.dto';

export class UpdateCivilGuardDto extends PartialType(CreateCivilGuardDto) {}
