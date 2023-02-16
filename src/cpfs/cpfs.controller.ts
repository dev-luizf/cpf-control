import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import cpfSchema from 'src/joi-schemas/cpf.schema';
import { joiValidate } from 'src/utils/joiValidate';
import { CpfsService } from './cpfs.service';
import { AddCpfDto } from './dto/create-cpf.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('CPF')
@Controller('cpf')
export class CpfsController {
  constructor(private readonly cpfsService: CpfsService) {}

  @ApiOperation({ description: 'Adiciona um CPF na lista restrita.' })
  @ApiCreatedResponse({
    description: 'CPF cadastrado com sucesso.',
    schema: {
      type: 'string',
      example: {
        cpf: '12345678901',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      },
    },
  })
  @ApiBody({
    description: 'CPF a ser cadastrado.',
    type: AddCpfDto,
    examples: {
      'Formato válido': {
        value: { cpf: '12345678901' },
      },
    },
  })
  @Post()
  create(@Body() addCpfDto: AddCpfDto) {
    joiValidate(cpfSchema, addCpfDto);
    return this.cpfsService.add(addCpfDto);
  }

  @ApiOperation({
    description: 'Visualiza todos os CPFs que estão na lista restrita.',
  })
  @ApiOkResponse({
    description: 'Lista de CPFs.',
    schema: {
      example: [
        {
          cpf: '12345678901',
          createdAt: '2021-03-01T00:00:00.000Z',
          updatedAt: '2021-03-01T00:00:00.000Z',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.cpfsService.findAll();
  }

  @ApiOperation({
    description: 'Verifica se um determinado CPF está na lista restrita.',
  })
  @ApiOkResponse({
    description: 'Um CPF específico.',
    schema: {
      example: {
        cpf: '12345678901',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      },
    },
  })
  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    joiValidate(cpfSchema, { cpf });
    return this.cpfsService.findOne(cpf);
  }

  @ApiOperation({ description: 'Remove um CPF da lista restrita.' })
  @ApiParam({
    name: 'cpf',
    examples: {
      'Formato válido': {
        value: '12345678901',
      },
    },
  })
  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    joiValidate(cpfSchema, { cpf });
    return this.cpfsService.remove(cpf);
  }
}
