import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuditModule } from './audit.module';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuditModule,
    {
      transport: Transport.GRPC, 
      options: {
        package: 'audit',
        protoPath: join(__dirname, './proto/audit.proto'),
        url: `0.0.0.0:${process.env.PORT}`,
      },
    },
  );
  await app.listen();
}
main();
