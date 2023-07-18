import { Injectable } from '@nestjs/common';
import { PublicationDTO } from './dto/publication.dto';

@Injectable()
export class PublicationService {
  publish(publication: PublicationDTO) {
    return 'Tá batendo aqui';
  }
}
