import { AbstractEntity } from '../../core/entity/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;
}
