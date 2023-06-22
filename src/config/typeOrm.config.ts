import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
config();
const configService = new ConfigService();

const entitiesFolder = ['src/modules/**/entities/*.ts'];
const migrationsFolder = ['src/migrations/*.ts'];
const seedsFolder = ['src/seeds/*.ts'];
const isDevelopment = configService.get<string>('NODE_ENV') === 'development';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    confService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: confService.get('DB_HOST'),
      port: confService.get('DB_PORT'),
      username: confService.get('DB_USER'),
      password: confService.get('DB_PASSWORD'),
      database: confService.get('DB_NAME'),
      autoLoadEntities: isDevelopment,
      synchronize: configService.get<string>('NODE_ENV') === 'development',
      logging: isDevelopment,
    };
  },
};

export const typeOrmConfig = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: entitiesFolder,
  migrations: migrationsFolder,
  logging: isDevelopment,
});

export const seedOrmConfig = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: entitiesFolder,
  migrations: seedsFolder,
  logging: isDevelopment,
});
