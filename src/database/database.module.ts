import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { typeOrmAsyncConfig } from '../config/typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string()
          .required()
          .error(
            new Error(
              `PLEASE MAKE SURE THAT YOU DEFINE DB HOST AND IT IS STRING`,
            ),
          ),
        POSTGRES_PORT: Joi.number()
          .required()
          .error(
            new Error(
              `PLEASE MAKE SURE THAT YOU DEFINE DB PORT AND IT IS NUMBER`,
            ),
          ),
        POSTGRES_DB_NAME: Joi.string()
          .required()
          .error(
            new Error(
              `PLEASE MAKE SURE THAT YOU DEFINE DB NAME AND IT IS STRING`,
            ),
          ),
        POSTGRES_USERNAME: Joi.string()
          .required()
          .error(
            new Error(
              `PLEASE MAKE SURE THAT YOU DEFINE DB USER AND IT IS STRING`,
            ),
          ),
        POSTGRES_PASSWORD: Joi.string()
          .required()
          .error(
            new Error(
              `PLEASE MAKE SURE THAT YOU DEFINE DB PASSWORD AND IT IS STRING`,
            ),
          ),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
})
export class DatabaseModule {}
