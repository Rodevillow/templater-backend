import { AbstractEntity } from '../../../core/entity/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 60, nullable: true })
  refreshToken: string;
}
