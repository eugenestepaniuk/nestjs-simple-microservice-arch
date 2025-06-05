import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditEntityType } from '../enums/audit-entity-type.enum';

// Интерфейс клиента gRPC
interface AuditServiceClient {
  LogAction(data: any): Promise<{ success: boolean }>;
}

@Injectable()
export class UsersService {
  private auditClient: AuditServiceClient;

  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject('AUDIT_PACKAGE') private client: ClientGrpc,
  ) {
    this.auditClient = this.client.getService<AuditServiceClient>('AuditService');
  }

  // Создание нового пользователя
  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(dto);
      await this.logAudit(AuditAction.UserCreated, user.id);
      return user;
    } catch (error) {
      throw new BadRequestException('Email must be unique');
    }
  }

  // Получение всех пользователей
  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ where: { deletedAt: null } });
  }

  // Получение пользователя по ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id, deletedAt: null } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // Обновление пользователя
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.userModel.update(dto, { where: { id } });
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException(`User with ID ${id} not found`);
    await this.logAudit(AuditAction.UserUpdated, id);
    return updated;
  }

  // Удаление пользователя
  async remove(id: string): Promise<void> {
    const deleted = await this.userModel.destroy({ where: { id } });
    if (deleted === 0) throw new NotFoundException(`User with ID ${id} not found`);
    await this.logAudit(AuditAction.UserDeleted, id);
  }

  // Логирование аудита
  private async logAudit(action: AuditAction, entityId: string) {
    try {
       const result = await this.auditClient.LogAction({
        action,
        entity_type: AuditEntityType.User,
        entity_id: entityId,
        timestamp: new Date().toISOString(),
      });
      !result.success && console.warn('Audit log failed');
    } catch (error: any) {
      console.error('Audit log error:', error.message);
    }
  }
}