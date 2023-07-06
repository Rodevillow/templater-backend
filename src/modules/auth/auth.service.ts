import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import {compare} from 'bcryptjs';
import { UserResponse } from '../../shared/models/user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  login(user: User): UserResponse {
    const payload = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    // exclude password and refreshtoken from response
    const { password, refreshToken, ...result } = user;

    return {
      ...result,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '60s',
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      }),
    };
  }

  getCookieWithJwtRefreshToken(userId: string) {
    const payload = { userId };
    const token: string = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookiesForLogOut() {
    return ['Refresh=; HttpOnly; Path=/; Max-Age=0'];
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
