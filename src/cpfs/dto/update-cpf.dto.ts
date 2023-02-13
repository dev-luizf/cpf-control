import { PartialType } from '@nestjs/mapped-types';
import { CreateCpfDto } from './create-cpf.dto';

export class UpdateCpfDto extends PartialType(CreateCpfDto) {}
