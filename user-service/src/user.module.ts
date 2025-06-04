import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { User } from './users/models/user.model';
import { join } from 'path';

// Модуль подключения БД и gRPC-клиента
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
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
export class AppModule {}
