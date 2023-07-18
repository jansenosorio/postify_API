import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = authorization?.split(' ')[1];

    try {
      const data = this.authService.checkToken(token);
      console.log(data);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
