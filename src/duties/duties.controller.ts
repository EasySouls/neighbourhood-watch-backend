import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DutiesService } from './duties.service';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/check-policies.guard';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/action';
import { Duty } from './entities/duty.entity';

@ApiTags('Duties')
@Controller('duties')
@UseGuards(AuthGuard, PoliciesGuard)
export class DutiesController {
  constructor(private readonly dutiesService: DutiesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Duty))
  startDuty(@Request() req, @Body() createDutyDto: CreateDutyDto) {
    return this.dutiesService.startDuty(createDutyDto, req.user.id);
  }

  @Post(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Duty))
  stopDuty(@Param('id') id: string) {
    return this.dutiesService.stopDuty(id);
  }

  @Get('civilGuard/:civilGuardId')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findAllByCivilGuardId(@Param('civilGuardId') civilGuardId: string) {
    return this.dutiesService.findAllByCivilGuardId(civilGuardId);
  }

  @Get('active')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findOwnActive(@Request() req) {
    return this.dutiesService.findOwnActive(req.user.id);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findAll() {
    return this.dutiesService.findAll();
  }

  @Get('department/:departmentId')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findAllByDepartmentId(@Param('departmentId') departmentId: string) {
    return this.dutiesService.findAllByDepartmentId(departmentId);
  }

  @Get('department/:departmentId/active')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findAllActiveByDepartmentId(@Param('departmentId') departmentId: string) {
    return this.dutiesService.findAllActiveByDepartmentId(departmentId);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  findOne(@Param('id') id: string) {
    return this.dutiesService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Duty))
  update(@Param('id') id: string, @Body() updateDutyDto: UpdateDutyDto) {
    return this.dutiesService.update(id, updateDutyDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Duty))
  remove(@Param('id') id: string) {
    return this.dutiesService.remove(id);
  }
}
