import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpfsService } from './cpfs.service';
import { CreateCpfDto } from './dto/create-cpf.dto';
import { UpdateCpfDto } from './dto/update-cpf.dto';

@Controller('cpfs')
export class CpfsController {
  constructor(private readonly cpfsService: CpfsService) {}

  @Post()
  create(@Body() createCpfDto: CreateCpfDto) {
    return this.cpfsService.create(createCpfDto);
  }

  @Get()
  findAll() {
    return this.cpfsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpfsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpfDto: UpdateCpfDto) {
    return this.cpfsService.update(+id, updateCpfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpfsService.remove(+id);
  }
}
