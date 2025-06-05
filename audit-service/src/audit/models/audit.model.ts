import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
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
  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE, defaultValue: DataType.NOW })
  updatedAt: Date;
}
