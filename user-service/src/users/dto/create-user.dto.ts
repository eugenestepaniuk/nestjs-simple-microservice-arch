import { IsEmail, IsString } from 'class-validator';

// Класс для создания пользователя
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
