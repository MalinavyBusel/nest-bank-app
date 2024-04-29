import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { clientTypesEnum } from 'common-model';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'enum', enum: clientTypesEnum })
  public type: clientTypesEnum;
}
