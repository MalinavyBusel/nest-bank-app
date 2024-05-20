import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { clientTypesEnum } from './client.interface';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'enum', enum: clientTypesEnum })
  public type: clientTypesEnum;

  @Column()
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column({ select: false, nullable: true })
  public refreshToken: string;
}
