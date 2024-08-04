import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDutyDto } from './dto/create-duty.dto';
import { UpdateDutyDto } from './dto/update-duty.dto';
import { Duty } from './entities/duty.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DutiesService {
  constructor(private prisma: PrismaService) {}

  async startDuty(createDutyDto: CreateDutyDto, civilGuardId: string): Promise<Duty> {
    if (civilGuardId === null) {
      throw new InternalServerErrorException('Civil Guard id is required to start duty.');
    }

    try {
      return await this.prisma.duty.create({
        data: {
          name: createDutyDto.name,
          description: createDutyDto.description,
          startDate: createDutyDto.startDate ?? new Date(),
          endDate: createDutyDto.endDate,
          type: createDutyDto.type,
          Department: {
            connect: { id: createDutyDto.departmentId },
          },
          civilGuards: {
            create: [{ civilGuardId }],
          },
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while creating duty.');
    }
  }

  async stopDuty(id: string): Promise<Duty | null> {
    try {
      const duty = await this.findOne(id);
      return this.prisma.duty.update({ where: { id: duty.id }, data: { endDate: new Date() } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while stopping duty.');
    }
  }

  async findAll(): Promise<Duty[]> {
    try {
      return await this.prisma.duty.findMany();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while finding duties.');
    }
  }

  async findAllActiveByDepartmentId(departmentId: string): Promise<Duty[]> {
    try {
      return this.prisma.duty.findMany({ where: { departmentId: departmentId, endDate: null } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(
        `Error happened while finding active duties with departmentId ${departmentId}.`,
      );
    }
  }
  async findAllByDepartmentId(departmentId: string): Promise<Duty[]> {
    try {
      return this.prisma.duty.findMany({ where: { departmentId } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while finding duties with departmentId ${departmentId}.`);
    }
  }

  async findOne(id: string): Promise<Duty | null> {
    try {
      const duty = await this.prisma.duty.findUnique({ where: { id } });
      if (!duty) {
        throw new NotFoundException(`Duty with id ${id} was not found.`);
      }
      return duty;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while finding duty with id ${id}.`);
    }
  }

  async update(id: string, updateDutyDto: UpdateDutyDto): Promise<Duty | null> {
    try {
      return await this.prisma.duty.update({ where: { id }, data: updateDutyDto });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while updating duty with id ${id}.`);
    }
  }

  async remove(id: string): Promise<Duty | null> {
    try {
      return await this.prisma.duty.delete({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while deleting duty with id ${id}.`);
    }
  }
}
