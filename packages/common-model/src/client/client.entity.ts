import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { clientTypesEnum } from './client.interface';
import { AccountEntity } from '../account/account.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'enum', enum: clientTypesEnum })
  public type: clientTypesEnum;

  @OneToMany(() => AccountEntity, (account) => account.clientId)
  accounts: AccountEntity[];
}
