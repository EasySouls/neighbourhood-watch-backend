import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ValidateCodeDto } from './dto/validateCode.dto';
import { SignUpDto } from './dto/signup.dto';
import { CivilGuard } from 'src/civil-guards/entities/civil-guard.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.authCode);
  }

  @HttpCode(HttpStatus.OK)
  @Post('validateCode')
  validateCode(@Body() validateCodeDto: ValidateCodeDto) {
    return this.authService.validateCode(validateCodeDto.code, validateCodeDto.email);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<CivilGuard> {
    return req.user;
  }
}
