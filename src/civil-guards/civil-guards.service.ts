import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CivilGuard, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CivilGuardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCivilGuardDto: Prisma.CivilGuardCreateInput): Promise<CivilGuard> {
    try {
      return await this.prisma.civilGuard.create({
        data: createCivilGuardDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<CivilGuard[]> {
    try {
      return await this.prisma.civilGuard.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async FindAllByDepartmentID(departmentID: string): Promise<CivilGuard[]> {
    try {
      return await this.prisma.civilGuard.findMany({
        where: { departmentId: departmentID },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllOnActiveDutyByDepartmentID(departmentID: string): Promise<CivilGuard[]> {
    try {
      return await this.prisma.civilGuard.findMany({
        where: {
          departmentId: departmentID,
          duties: {
            some: {
              duty: {
                endDate: null,
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneByID(id: string): Promise<CivilGuard | null> {
    try {
      const civilGuard = await this.prisma.civilGuard.findUnique({ where: { id } });
      if (!civilGuard) {
        throw new NotFoundException('Civil Guard not found');
      }
      return civilGuard;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCivilGuardDto: Prisma.CivilGuardUpdateInput): Promise<CivilGuard> {
    try {
      return await this.prisma.civilGuard.update({
        where: { id },
        data: updateCivilGuardDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<CivilGuard> {
    // TODO - Only the departments leader can delete a civil guard
    try {
      return this.prisma.civilGuard.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
