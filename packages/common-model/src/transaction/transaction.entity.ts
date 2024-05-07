import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { AccountEntity } from '../account';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public datetime: string;

  @Column({ type: 'double precision' })
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
