import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationDTO } from './dto/publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService) {}
  async publish(publication: PublicationDTO) {
    const published = Boolean(publication.published);

    try {
      const publications = await this.prisma.publication.create({
        data: {
          publicationImage: publication.image,
          publicationTitle: publication.title,
          publicationText: publication.text,
          published: published,
          dateToPublished: publication.dateToPublish,
          socialMedia: publication.socialMedia,
          userId: Number(publication.userId),
        },
      });

      return publications;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Your inputs is incorrect',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
