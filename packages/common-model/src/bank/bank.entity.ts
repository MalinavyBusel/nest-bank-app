import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 100 })
  public name: string;

  @Column({ type: 'int2' })
  public entityCommission: number;

  @Column({ type: 'int2' })
  public individualCommission: number;
}
