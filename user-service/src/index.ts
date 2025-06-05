import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import * as dotenv from 'dotenv';
import { RequestTimestampInterceptor } from './common/interceptors/request-timestamp.interceptor';

dotenv.config();

async function main() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalInterceptors(new RequestTimestampInterceptor());
  await app.listen(3000);
}
main();
