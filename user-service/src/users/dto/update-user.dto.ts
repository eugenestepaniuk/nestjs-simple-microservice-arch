import { IsEmail, IsOptional, IsString } from 'class-validator';

// Класс для обновления пользователя
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
