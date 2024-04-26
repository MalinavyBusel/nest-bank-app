import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public entityComission: number;

  @Column()
  public individualComission: number;
}
