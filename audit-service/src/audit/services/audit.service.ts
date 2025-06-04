import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditLog } from '../models/audit.model';
import { AuditLogDto } from '../dto/audit-log.dto';

// Cервис для сохранения логов в базу
@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog)
    private readonly auditModel: typeof AuditLog,
  ) {}

  async logAction(dto: AuditLogDto): Promise<boolean> {
    try {
      await this.auditModel.create({
        action: dto.action,
        entity_type: dto.entity_type,
        entity_id: dto.entity_id,
        timestamp: new Date(dto.timestamp),
      });
      return true;
    } catch (error: any) {
      console.error('Failed to log audit action:', error.message);
      return false;
    }
  }
}
