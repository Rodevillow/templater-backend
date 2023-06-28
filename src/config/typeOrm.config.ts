import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

config();
const configService = new ConfigService();

const entitiesFolder = ['src/modules/**/entities/*.ts'];
const migrationsFolder = ['src/migrations/*.ts'];
const seedsFolder = ['src/seeds/*.ts'];
const isDevelopment = configService.get<string>('NODE_ENV') !== 'prod';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    confService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: confService.get<string>('POSTGRES_HOST'),
      port: +confService.get<number>('POSTGRES_PORT'),
      database: confService.get<string>('POSTGRES_DB'),
      username: confService.get<string>('POSTGRES_USER'),
      password: confService.get<string>('POSTGRES_PASSWORD'),
      autoLoadEntities: isDevelopment,
      synchronize: isDevelopment,
      logging: isDevelopment,
    };
  },
};

export const typeOrmConfigJson = {
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  database: configService.get<string>('POSTGRES_DB'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
};

export const typeOrmConfig = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  database: configService.get<string>('POSTGRES_DB'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  entities: entitiesFolder,
  migrations: migrationsFolder,
  logging: isDevelopment,
});

export const seedOrmConfig = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  database: configService.get<string>('POSTGRES_DB'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  entities: entitiesFolder,
  migrations: seedsFolder,
  logging: isDevelopment,
});
