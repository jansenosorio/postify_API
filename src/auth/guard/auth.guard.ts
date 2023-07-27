import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = authorization?.split(' ')[1];

    try {
      const data = this.authService.checkToken(token);
      const user = await this.userService.findUserById(Number(data.userId));
      console.log(user);
      request.user = user;
    } catch (error) {
      throw new BadRequestException(error);
    }

    return true;
  }
}
