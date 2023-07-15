import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class AuthSignDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
