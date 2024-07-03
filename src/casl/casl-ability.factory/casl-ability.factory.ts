import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { CivilGuard } from 'src/civil-guards/entities/civil-guard.entity';
import { Duty } from 'src/duties/entities/duty.entity';
import { Action } from '../action';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

type Subjects = InferSubjects<typeof CivilGuard | typeof Duty | 'all'>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForCivilGuard(civilGuard: CivilGuard) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (civilGuard.roles.includes(Role.ADMIN)) {
      can(Action.Manage, 'all');
    } else if (civilGuard.roles.includes(Role.DEP_HEAD)) {
      can(Action.Manage, CivilGuard, { departmentId: civilGuard.departmentId });
      can(Action.Manage, Duty, { departmentId: civilGuard.departmentId });
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, CivilGuard, { id: civilGuard.id });

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
