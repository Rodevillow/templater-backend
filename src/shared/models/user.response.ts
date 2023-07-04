import { User } from '../../modules/users/entities/user.entity';

export type UserResponse = Omit<
  User & { accessToken: string },
  'password' | 'refreshToken'
>;
