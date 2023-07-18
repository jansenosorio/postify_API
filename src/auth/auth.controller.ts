import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDTO } from './dto/auth.signup.dto';
import { AuthSignDTO } from './dto/auth.signin.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  signup(@Body() body: AuthSignupDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  login(@Body() body: AuthSignDTO) {
    return this.authService.login(body);
  }
}
