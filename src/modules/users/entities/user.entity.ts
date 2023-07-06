import { AbstractEntity } from '../../../core/entity/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User extends AbstractEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 60, nullable: true })
  refreshToken: string;
}
