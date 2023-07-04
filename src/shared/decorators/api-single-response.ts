import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseModel } from '../models/response';
import { User } from '../../modules/users/entities/user.entity';
import { LoginDto } from '../../modules/auth/dto/login.dto';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';

export const ApiSingleResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResponseModel, User, LoginDto, CreateUserDto),
    ApiOkResponse({
      description: 'Successfully received single entity',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseModel) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(model),
              },
              meta: {
                type: 'object',
                nullable: true,
              },
            },
          },
        ],
      },
    }),
  );
};
