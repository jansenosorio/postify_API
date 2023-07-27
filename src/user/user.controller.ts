import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from 'src/auth/decorators/user.decorators';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getallusers(@UserRequest() user: User) {
    return this.userService.getAllUsers(user);
  }
}
