import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { UserCreation } from "./types/user-creation.interface";

// Создание модели для пользователей
@Table({ tableName: 'users', paranoid: true, timestamps: true })
export class User extends Model<User, UserCreation> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  deletedAt: Date | null;
}
