import { Injectable } from '@nestjs/common';
import { CreateCpfDto } from './dto/create-cpf.dto';
import { UpdateCpfDto } from './dto/update-cpf.dto';

@Injectable()
export class CpfsService {
  create(createCpfDto: CreateCpfDto) {
    return 'This action adds a new cpf';
  }

  findAll() {
    return `This action returns all cpfs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cpf`;
  }

  update(id: number, updateCpfDto: UpdateCpfDto) {
    return `This action updates a #${id} cpf`;
  }

  remove(id: number) {
    return `This action removes a #${id} cpf`;
  }
}
