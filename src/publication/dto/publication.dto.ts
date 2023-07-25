import {
  IsBooleanString,
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class PublicationDTO {
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  dateToPublish: string;
  @IsBooleanString()
  @IsNotEmpty()
  published: boolean;
  @IsString()
  @IsNotEmpty()
  socialMedia: string;
  @IsNumberString()
  @IsNotEmpty()
  userId: string;
}
