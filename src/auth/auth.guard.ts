import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CivilGuardsService } from 'src/civil-guards/civil-guards.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private civilGuardsService: CivilGuardsService,
  ) {}

  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

      // Check if the Civil Guard exists
      const civilGuard = await this.civilGuardsService.findOneByAccountID(payload.sub);
      if (!civilGuard) {
        this.logger.error(`Civil Guard not found for account ID ${payload.sub}`);
        throw new UnauthorizedException();
      }

      // Assigning the Civil Guard to the request object
      // so that it can be accessed in the route handlers
      request['user'] = civilGuard;
    } catch (error) {
      this.logger.error(`Error happened while verifying the token: ${error.message}`);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
