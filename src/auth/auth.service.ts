import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { CivilGuardsService } from 'src/civil-guards/civil-guards.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private civilGuardsService: CivilGuardsService,
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger(AuthService.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateCode(code: number, email: string): Promise<{ isValid: boolean; name: string | null }> {
    if (!code || !email) {
      throw new BadRequestException('Code and email are required');
    }

    const civilGuard = await this.civilGuardsService.findOneByAuthCode(Number(code));

    // TODO - Check if the email is correct as well
    // Maybe send back a unique code, and if the request to sign in is made with the same code, then it's valid

    return {
      isValid: civilGuard !== null,
      name: civilGuard?.name || null,
    };
  }

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    if (!email || !pass) {
      this.logger.error(
        'Email and password are required. Email: ' + email + ', Password: ' + pass,
        'AuthService::login',
      );
      throw new BadRequestException('Email and password are required');
    }

    const account = await this.accountsService.findOneByEmail(email);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.password !== pass) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = { sub: account.id, email: account.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string, authCode: number) {
    if (!email || !password || !authCode) {
      throw new BadRequestException('Email, password, and auth code are required');
    }

    const accountExists = await this.accountsService.findOneByEmail(email);
    if (accountExists) {
      throw new BadRequestException('Account with this email already exists');
    }

    const civilGuard = await this.civilGuardsService.findOneByAuthCode(authCode);
    console.log('Civil Guard', civilGuard);
    if (!civilGuard) {
      throw new NotFoundException('Civil Guard not found in AuthService::signUp');
    }

    const accountOptions: CreateAccountDto = {
      name: civilGuard.name,
      email,
      password,
      civilGuardId: civilGuard.id,
    };
    try {
      const account = await this.accountsService.create(accountOptions);
      console.log('Account created', account);

      // Update the civil guard with the assigned roles
      await this.civilGuardsService.update(civilGuard.id, { roles: [Role.CIVIL_GUARD] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...accountWithoutPassword } = account;
      return accountWithoutPassword;
    } catch (error) {
      throw new Error('Error creating account');
    }
  }
}
