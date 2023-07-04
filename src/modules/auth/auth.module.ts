import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import * as process from 'process';
import { LocalStrategy } from './strategies/local-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategies/refreshToken-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UsersService,
    ConfigService,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
