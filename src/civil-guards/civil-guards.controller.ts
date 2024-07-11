import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CivilGuardsService } from './civil-guards.service';
import { UpdateCivilGuardDto } from './dto/update-civil-guard.dto';
import { ApiTags } from '@nestjs/swagger';
import { CivilGuard } from './entities/civil-guard.entity';
import { CreateCivilGuardDto } from './dto/create-civil-guard.dto';

@ApiTags('Civil Guards')
@Controller('civilguards')
export class CivilGuardsController {
  constructor(private readonly civilGuardsService: CivilGuardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCivilGuardDto: CreateCivilGuardDto): Promise<CivilGuard> {
    return this.civilGuardsService.create(createCivilGuardDto);
  }

  @Get()
  findAll(): Promise<CivilGuard[]> {
    return this.civilGuardsService.findAll();
  }

  @Get('department/:departmentID')
  findAllByDepartmentID(@Param('departmentID') departmentID: string): Promise<CivilGuard[]> {
    return this.civilGuardsService.findAllByDepartmentID(departmentID);
  }

  @Get('department/:departmentID/active')
  findAllOnActiveDutyByDepartmentID(@Param('departmentID') departmentID: string): Promise<CivilGuard[]> {
    return this.civilGuardsService.findAllOnActiveDutyByDepartmentID(departmentID);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('complete') complete: boolean = false): Promise<CivilGuard | null> {
    return this.civilGuardsService.findOneByID(id, complete);
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
