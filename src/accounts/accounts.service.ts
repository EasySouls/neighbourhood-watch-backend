import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

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
}
