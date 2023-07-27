import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAllUsers(user: User) {
    const allPublications = this.prismaService.publication.findMany({
      where: {
        userId: user.userId,
      },
    });

    return allPublications;
  }

  findUserById(userId: number) {
    const user = this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });

    return user;
  }
}
