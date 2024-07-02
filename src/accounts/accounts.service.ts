import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateAccountDto): Promise<Account> {
    return this.prisma.account.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        civilGuards: { connect: { id: data.civilGuardId } },
      },
    });
  }
}
