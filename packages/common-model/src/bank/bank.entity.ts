import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public entityCommission: number;

  @Column()
  public individualCommission: number;
}
