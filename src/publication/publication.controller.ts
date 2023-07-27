import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDTO } from './dto/publication.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  publication(@Body() publication: PublicationDTO) {
    return this.publicationService.publish(publication);
  }
}
