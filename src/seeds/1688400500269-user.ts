import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { generateHash } from '../shared/functions/hashed-password';

export class User1688400500269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(User);
    const testUser: Partial<User> = {
      firstName: 'firstName',
      lastName: 'lastName',
      password: await generateHash('123456'),
      email: 'test@mail.com',
    };
    await userRepository.save(testUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
