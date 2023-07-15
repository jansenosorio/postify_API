import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SigninModule } from './signin/signin.module';
import { PublicationModule } from './publications/publication.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, SigninModule, PublicationModule, PrismaModule],
})
export class AppModule {}
