import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DutiesService } from './duties.service';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Duties')
@Controller('duties')
export class DutiesController {
  constructor(private readonly dutiesService: DutiesService) {}

  @Post()
  create(@Body() createDutyDto: CreateDutyDto) {
    return this.dutiesService.create(createDutyDto);
  }

  @Post(':id')
  stopDuty(@Param('id') id: string) {
    return this.dutiesService.stopDuty(id);
  }

  @Get()
  findAll() {
    return this.dutiesService.findAll();
  }

  @Get('department/:departmentId')
  findAllByDepartmentId(@Param('departmentId') departmentId: string) {
    return this.dutiesService.findAllByDepartmentId(departmentId);
  }

  @Get('department/:departmentId/active')
  findAllActiveByDepartmentId(@Param('departmentId') departmentId: string) {
    return this.dutiesService.findAllActiveByDepartmentId(departmentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dutiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDutyDto: UpdateDutyDto) {
    return this.dutiesService.update(id, updateDutyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dutiesService.remove(id);
  }
}
