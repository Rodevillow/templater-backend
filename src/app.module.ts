import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TestService } from './test/test.service';
import { UsersModule } from './users/users.module';
import { TestController } from './test/test.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController, TestController],
  providers: [TestService],
})
export class AppModule {}
