import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

type ExceptionType =
  | 'BadRequestException'
  | 'NotFoundException'
  | 'ConflictException';

type Entities = 'Cpf' | 'User';

const exceptions = {
  BadRequestException: (entity: Entities, errorMessage?: string) => {
    const type = `Invalid${entity}Exception`;
    const message = errorMessage || 'Bad Request.';
    throw new BadRequestException({ type, message });
  },
  NotFoundException: (entity: Entities, errorMessage?: string) => {
    const type = `NotFound${entity}Exception`;
    const message = errorMessage || 'Not Found.';
    throw new NotFoundException({ type, message });
  },
  ConflictException: (entity: Entities, errorMessage?: string) => {
    const type = `Exists${entity}Exception`;
    const message = errorMessage || 'Already Exists.';
    throw new ConflictException({ type, message });
  },
};

const apiException = (
  exceptionType: ExceptionType,
  entity: Entities,
  errorMessage?: string,
) => {
  exceptions[exceptionType](entity, errorMessage);
};

export default apiException;
