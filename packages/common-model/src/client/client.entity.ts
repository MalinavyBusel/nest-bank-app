import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { clientTypesEnum } from './client.interface';
import { hash } from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
