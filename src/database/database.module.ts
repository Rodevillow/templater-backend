import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { typeOrmAsyncConfig } from '../config/typeOrm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Blog],
      synchronize: true,
//     ConfigModule.forRoot({
//       validationSchema: Joi.object({
//         PORT: Joi.number(),
//         DB_NAME: Joi.string()
//           .required()
//           .error(
//             new Error(
//               `PLEASE MAKE SURE THAT YOU DEFINE DB NAME AND IT IS STRING`,
//             ),
//           ),
//         DB_HOST: Joi.string()
//           .required()
//           .error(
//             new Error(
//               `PLEASE MAKE SURE THAT YOU DEFINE DB HOST AND IT IS STRING`,
//             ),
//           ),
//         DB_PASSWORD: Joi.string()
//           .required()
//           .error(
//             new Error(
//               `PLEASE MAKE SURE THAT YOU DEFINE DB PASSWORD AND IT IS STRING`,
//             ),
//           ),
//         DB_PORT: Joi.number()
//           .required()
//           .error(
//             new Error(
//               `PLEASE MAKE SURE THAT YOU DEFINE DB PORT AND IT IS NUMBER`,
//             ),
//           ),
//         DB_USER: Joi.string()
//           .required()
//           .error(
//             new Error(
//               `PLEASE MAKE SURE THAT YOU DEFINE DB USER AND IT IS STRING`,
//             ),
//           ),
//       }),

    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
})
export class DatabaseModule {}
