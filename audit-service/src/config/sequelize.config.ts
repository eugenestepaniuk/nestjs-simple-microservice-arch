import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { AuditLog } from '../audit/models/audit.model';
import * as dotenv from 'dotenv';

dotenv.config();

// Конфигурация подключення к базе
export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [AuditLog],
  autoLoadModels: true,
  synchronize: true,
};
