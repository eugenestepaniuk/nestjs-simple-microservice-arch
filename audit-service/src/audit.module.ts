import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditLog } from './audit/models/audit.model';
import { AuditService } from './audit/services/audit.service';
import { AuditController } from './audit/controllers/audit.controller';
import { sequelizeConfig } from './config/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig), // подлкючение к базе данных
    SequelizeModule.forFeature([AuditLog]),   // регисрация модели AuditLog
  ],
  controllers: [AuditController],             // gRPC контроллер
  providers: [AuditService],                  // логика сервиса
})
export class AuditModule {}
