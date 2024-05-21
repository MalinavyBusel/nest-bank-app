import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { clientTypesEnum } from './client.interface';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 100 })
  public name: string;

  @Column({ type: 'enum', enum: clientTypesEnum, enumName: 'client_type_enum' })
  public type: clientTypesEnum;

  @Column({ unique: true, length: 100 })
  public email: string;

  @Column({ select: false, length: 44 })
  public password: string;

  @Column({ select: false, nullable: true, length: 44 })
  public refreshToken: string;
}
