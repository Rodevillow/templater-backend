import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateHash } from '../../shared/functions/hashed-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        password: await generateHash(createUserDto.password),
      };
      const user: InsertResult = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .execute();
      return user.raw;
    } catch (e) {
      // TODO: catch duplicated error
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await generateHash(refreshToken);
    await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({
        refreshToken: currentHashedRefreshToken,
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  async getById(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('Credentionals not valid', HttpStatus.NO_CONTENT);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    const user: User = await this.getById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    } else {
      throw new HttpException(
        'Refresh token not valid!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({
        refreshToken: null,
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
