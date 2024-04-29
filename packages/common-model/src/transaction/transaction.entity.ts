import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from '../account';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'timestamptz' })
  public datetime: Date;

  @Column()
  public amount: number;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'fromId' })
  public from: AccountEntity;

  @Column()
  public fromId: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'toId' })
  public to: AccountEntity;

  @Column()
  public toId: string;
}
