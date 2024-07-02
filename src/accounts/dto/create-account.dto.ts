import { OmitType } from '@nestjs/swagger';
import { Account } from '../entity/account.entity';
import { IsString } from 'class-validator';

export class CreateAccountDto extends OmitType(Account, ['id', 'createdAt', 'updatedAt'] as const) {
  @IsString()
  civilGuardId: string;
}
