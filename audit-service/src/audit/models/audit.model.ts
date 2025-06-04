import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { AuditLogCreation } from './types/audit-log-creation.interface'
import { AuditAction } from '../enums/audit-action.enum';
import { AuditEntityType } from '../enums/audit-entity-type.enum';

// Создание модели для аудита 
@Table({ tableName: 'audit_logs', timestamps: true })
export class AuditLog extends Model<AuditLog, AuditLogCreation> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING })
  action: string | AuditAction;

  @Column({ type: DataType.SMALLINT })
  entity_type: number | AuditEntityType;

  @Column({ type: DataType.STRING })
  entity_id: string;

  @Column({ type: DataType.DATE })
  timestamp: Date;

  // Автоматические поля создания/обновления
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updated_at: Date;
}
