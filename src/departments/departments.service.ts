import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'nestjs-prisma';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      return await this.prisma.department.create({
        data: createDepartmentDto,
      });
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Error happened while creating the department');
    }
  }

  async findAll(): Promise<Department[]> {
    try {
      return await this.prisma.department.findMany();
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Error happened while finding the departments');
    }
  }

  async findOne(id: string): Promise<Department | null> {
    try {
      const department = await this.prisma.department.findUnique({ where: { id } });
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return department;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while trying to find the department');
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    try {
      return await this.prisma.department.update({
        where: { id },
        data: updateDepartmentDto,
      });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while updating the department');
    }
  }

  async remove(id: string): Promise<Department | null> {
    try {
      return await this.prisma.department.delete({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while deleting the department');
    }
  }
}
