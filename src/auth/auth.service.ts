import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthSignupDTO } from './dto/auth.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthSignDTO } from './dto/auth.signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async login(body: AuthSignDTO) {
    const email = body.email;
    const password = body.password;

    const user = await this.prisma.user.findUnique({
      where: {
        userEmail: email,
      },
    });

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'User or password are incorret',
        },
        HttpStatus.UNAUTHORIZED,
      );

    const passwordMatches = await bcrypt.compareSync(
      password,
      user.userPassword,
    );

    if (!passwordMatches)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'User or password are incorret',
        },
        HttpStatus.UNAUTHORIZED,
      );

    return this.createToken(body);
  }

  createToken(body: AuthSignDTO) {
    const secret = this.configService.get('JWT_SECRET_KEY');

    const token = this.jwtService.sign(
      {
        email: body.email,
        password: body.password,
      },
      {
        expiresIn: '60min',
        secret: secret,
      },
    );

    return { access_token: token };
  }
}
