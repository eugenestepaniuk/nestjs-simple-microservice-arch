import { AuditAction } from '../../enums/audit-action.enum';
import { AuditEntityType } from '../../enums/audit-entity-type.enum';

export interface AuditLogCreation {
  action: AuditAction;
  entity_type: AuditEntityType;
  entity_id: string;
  timestamp: Date;
}
