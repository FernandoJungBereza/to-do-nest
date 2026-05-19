import { BaseEntity } from '@/shared/entities/base-entity';
import { Column, Entity } from 'typeorm';
import { UserEntityInterface } from '../interfaces/user-entity.interface';

@Entity('users')
export class UserEntity extends BaseEntity implements UserEntityInterface {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
