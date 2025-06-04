import { Table, Column, Model, DataType } from 'sequelize-typescript';
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

  @Column({ type: DataType.DATE })
  created_at: Date;

  @Column({ type: DataType.DATE })
  updated_at: Date;

  @Column({ type: DataType.DATE })
  deleted_at: Date | null;
}
