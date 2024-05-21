import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { currencyTypesEnum } from './account.interface';
import { ClientEntity } from '../client';
import { BankEntity } from '../bank';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: currencyTypesEnum,
    enumName: 'currency_name_enum',
  })
  public currency: currencyTypesEnum;

  @Column({ type: 'double precision' })
  public amount: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @Column()
  clientId: string;

  @ManyToOne(() => BankEntity)
  @JoinColumn({ name: 'bankId' })
  bank: BankEntity;

  @Column()
  bankId: string;
}
