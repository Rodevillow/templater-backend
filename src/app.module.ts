import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, UsersModule],
  controllers: [TestController],
  providers: [TestService],
})
export class AppModule {}
