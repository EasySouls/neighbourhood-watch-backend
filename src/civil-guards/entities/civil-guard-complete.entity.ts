import { Duty } from '../../duties/entities/duty.entity';
import { Department } from '../../departments/entities/department.entity';
import { Account } from '../../accounts/entity/account.entity';
import { CivilGuard } from './civil-guard.entity';

export class CivilGuardComplete extends CivilGuard {
  account: Account;

  department: Department;

  duties: Duty[];
}
