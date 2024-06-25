import { PartialType } from '@nestjs/swagger';
import { CreateDutyDto } from './create-duty.dto';

export class UpdateDutyDto extends PartialType(CreateDutyDto) {}
