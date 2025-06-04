import { IsEnum, IsUUID, IsISO8601 } from 'class-validator';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditEntityType } from '../enums/audit-entity-type.enum';

// Класс для валидации данных, которые приходят с gRPC
export class AuditLogDto {
  @IsEnum(AuditAction)
  action: AuditAction;

  @IsEnum(AuditEntityType)
  entity_type: AuditEntityType;

  @IsUUID()
  entity_id: string;

  @IsISO8601()
  timestamp: string;
}
