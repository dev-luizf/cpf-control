import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export const joiValidate = (
  schema: Joi.ObjectSchema | Joi.ArraySchema,
  payload: any,
) => {
  const { error } = schema.validate(payload);

  if (error) {
    const { key } = error.details[0].context;
    const exceptionKey = key[0].toUpperCase() + key.slice(1);
    throw new BadRequestException({
      type: `Invalid${exceptionKey}Exception`,
      message: error.message,
    });
  }
};
