import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDTO } from './dto/auth.signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  signup(@Body() body: AuthSignupDTO) {
    return this.authService.signup(body);
  }
}
