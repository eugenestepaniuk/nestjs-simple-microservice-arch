import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { sequelizeConfig } from './config/sequelize.config';
import { User } from './users/models/user.model';
import { join } from 'path';

// Модуль подключения БД и gRPC-клиента
@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig), // подлкючение к базе данных
    SequelizeModule.forFeature([User]),       // регисрация модели User
    ClientsModule.register([
      {
        name: 'AUDIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'audit',
          protoPath: join(__dirname, './proto/audit.proto'),
          url: process.env.AUDIT_GRPC_URL,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
