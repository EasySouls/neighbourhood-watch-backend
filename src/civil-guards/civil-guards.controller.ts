import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CivilGuardsService } from './civil-guards.service';
import { UpdateCivilGuardDto } from './dto/update-civil-guard.dto';
import { CivilGuard, Prisma } from '@prisma/client';

@Controller('civilguards')
export class CivilGuardsController {
  constructor(private readonly civilGuardsService: CivilGuardsService) {}

  @Post()
  create(@Body() createCivilGuardDto: Prisma.CivilGuardCreateInput): Promise<CivilGuard> {
    return this.civilGuardsService.create(createCivilGuardDto);
  }

  @Get()
  findAll(): Promise<CivilGuard[]> {
    return this.civilGuardsService.findAll();
  }

  @Get('department/:departmentID')
  findAllByDepartmentID(@Param('departmentID') departmentID: string): Promise<CivilGuard[]> {
    return this.civilGuardsService.FindAllByDepartmentID(departmentID);
  }

  @Get('department/:departmentID/active')
  findAllOnActiveDutyByDepartmentID(@Param('departmentID') departmentID: string): Promise<CivilGuard[]> {
    return this.civilGuardsService.findAllOnActiveDutyByDepartmentID(departmentID);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CivilGuard | null> {
    return this.civilGuardsService.findOneByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCivilGuardDto: UpdateCivilGuardDto): Promise<CivilGuard> {
    return this.civilGuardsService.update(id, updateCivilGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CivilGuard> {
    return this.civilGuardsService.remove(id);
  }
}
