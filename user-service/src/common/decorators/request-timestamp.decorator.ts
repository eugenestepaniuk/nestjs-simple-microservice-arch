import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Кастомный декоратор для получения времени запроса
export const RequestTimestamp = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.requestTimestamp;
  },
);
