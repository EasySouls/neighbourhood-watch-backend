import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCivilGuardDto } from './dto/create-civil-guard.dto';
import { UpdateCivilGuardDto } from './dto/update-civil-guard.dto';
import { CivilGuard } from './entities/civil-guard.entity';
import { randomInt } from 'crypto';

@Injectable()
export class CivilGuardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCivilGuardDto: CreateCivilGuardDto): Promise<CivilGuard> {
    try {
      return await this.prisma.civilGuard.create({
        data: {
          name: createCivilGuardDto.name,
          // account: {
          //   connect: {
          //     id: createCivilGuardDto.accountId,
          //   },
          // },
          roles: createCivilGuardDto.roles,
          department: {
            connect: {
              id: createCivilGuardDto.departmentId,
            },
          },
          // TODO - Format to 6 digits
          authCode: randomInt(100000, 999999),
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while creating a new Civil Guard.');
    }
  }

  async findAll(): Promise<CivilGuard[]> {
    try {
      return await this.prisma.civilGuard.findMany();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while fetching Civil Guards.');
    }
  }

  async findAllByDepartmentID(departmentID: string): Promise<CivilGuard[]> {
    try {
      return await this.prisma.civilGuard.findMany({
        where: { departmentId: departmentID },
      });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while fetching Civil Guards by department.');
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
      console.error(error.message);
      throw new InternalServerErrorException('Error happened while fetching Civil Guards on active duty.');
    }
  }

  async findOneByID(id: string, complete: boolean): Promise<CivilGuard | null> {
    try {
      if (complete) {
        const completeCivilGuard = await this.prisma.civilGuard.findUnique({
          where: { id },
          include: {
            duties: true,
            department: true,
            account: { select: { email: true, createdAt: true, updatedAt: true } },
          },
        });
        if (!completeCivilGuard) {
          throw new NotFoundException('Civil Guard not found');
        }
        return completeCivilGuard;
      } else {
        const civilGuard = await this.prisma.civilGuard.findUnique({ where: { id } });
        if (!civilGuard) {
          throw new NotFoundException('Civil Guard not found');
        }
        return civilGuard;
      }
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while fetching a Civil Guard with id ${id}.`);
    }
  }

  async findOneByAccountID(accountID: string): Promise<CivilGuard | null> {
    const civilGuard = await this.prisma.civilGuard.findFirst({ where: { accountId: accountID } });
    if (!civilGuard) {
      throw new NotFoundException('Civil Guard not found');
    }
    return civilGuard;
  }

  async findOneByAuthCode(code: number): Promise<CivilGuard | null> {
    try {
      return await this.prisma.civilGuard.findUnique({ where: { authCode: code } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while fetching a Civil Guard with authCode ${code}.`);
    }
  }

  async update(id: string, updateCivilGuardDto: UpdateCivilGuardDto): Promise<CivilGuard> {
    try {
      return await this.prisma.civilGuard.update({
        where: { id },
        data: updateCivilGuardDto,
      });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while updating Civil Guard with id ${id}.`);
    }
  }

  async remove(id: string): Promise<CivilGuard> {
    // TODO - Only the departments leader can delete a civil guard
    try {
      return this.prisma.civilGuard.delete({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Error happened while deleting Civil Guard with id ${id}.`);
    }
  }
}
