import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import addCpfSchema from 'src/joi-schemas/cpf.schema';
import { joiValidate } from 'src/utils/joiValidate';
import { CpfsService } from './cpfs.service';
import { AddCpfDto } from './dto/create-cpf.dto';

@Controller('cpf')
export class CpfsController {
  constructor(private readonly cpfsService: CpfsService) {}

  @Post()
  create(@Body() addCpfDto: AddCpfDto) {
    joiValidate(addCpfSchema, addCpfDto)
    return this.cpfsService.add(addCpfDto);
  }

  @Get()
  findAll() {
    return this.cpfsService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.cpfsService.findOne(cpf);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.cpfsService.remove(cpf);
  }
}
