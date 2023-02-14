import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import cpfSchema from 'src/joi-schemas/cpf.schema';
import { joiValidate } from 'src/utils/joiValidate';
import { CpfsService } from './cpfs.service';
import { AddCpfDto } from './dto/create-cpf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CPF')
@Controller('cpf')
export class CpfsController {
  constructor(private readonly cpfsService: CpfsService) {}

  @Post()
  create(@Body() addCpfDto: AddCpfDto) {
    joiValidate(cpfSchema, addCpfDto);
    return this.cpfsService.add(addCpfDto);
  }

  @Get()
  findAll() {
    return this.cpfsService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    joiValidate(cpfSchema, { cpf });
    return this.cpfsService.findOne(cpf);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    joiValidate(cpfSchema, { cpf });
    return this.cpfsService.remove(cpf);
  }
}
