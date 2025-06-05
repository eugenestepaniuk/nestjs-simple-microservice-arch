import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuditService } from '../services/audit.service';
import { AuditLogDto } from '../dto/audit-log.dto';

interface LogResponse {
  success: boolean;
}

// Контроллер, который принимает gRPC-вызовы
@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @GrpcMethod('AuditService', 'LogAction')
  async logAction(data: AuditLogDto): Promise<LogResponse> {
    console.log('data: ', data);
    const success = await this.auditService.logAction(data);
    return { success };
  }
}
