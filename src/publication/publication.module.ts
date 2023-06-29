import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationsModule } from './publications/publications.module';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService],
  imports: [PublicationsModule],
})
export class PublicationModule {}
