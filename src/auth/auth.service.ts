import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthSignupDTO } from './dto/auth.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(body: AuthSignupDTO) {
    const hashPassword = bcrypt.hashSync(body.password, 10);

    const isEmailExists = await this.prisma.user.findUnique({
      where: {
        userEmail: body.email,
      },
    });

    if (isEmailExists)
      throw new HttpException('Intern Conflict', HttpStatus.CONFLICT);

    await this.prisma.user.create({
      data: {
        userName: body.name,
        userEmail: body.email,
        userAvatar: body.avatar,
        userPassword: hashPassword,
      },
    });
  }
}
