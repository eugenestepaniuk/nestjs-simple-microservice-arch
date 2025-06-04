import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestTimestampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();    // Получаем объект запроса
    request.requestTimestamp = new Date().toISOString();    // Добавляем свойство requestTimestamp с текущим временем в формате ISO
    return next.handle();                                   // Передаем управление следующему обработчику
  }
}
