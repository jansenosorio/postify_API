import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthSignupDTO } from './dto/auth.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthSignDTO } from './dto/auth.signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  private AUDIENCE = 'users';
  private ISSUER = 'Driven';

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

    return this.createToken(user);
  }

  async createToken(user: UserDTO) {
    const secret = this.configService.get('JWT_SECRET_KEY');

    const token = this.jwtService.sign(
      {
        email: user.userEmail,
        userId: user.userId,
      },
      {
        expiresIn: '60min',
        secret: secret,
        subject: String(user.userId),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    const createdToken = await this.prisma.session.create({
      data: {
        userId: user.userId,
        token,
      },
    });

    if (!createdToken)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Intern problem, try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return { access_token: createdToken.token };
  }

  checkToken(token: string) {
    const secret = this.configService.get('JWT_SECRET_KEY');
    try {
      const data = this.jwtService.verify(token, { secret: secret });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
