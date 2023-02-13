import { Injectable } from '@nestjs/common';
import { AddCpfDto } from './dto/create-cpf.dto';
import { prisma } from 'src/prisma';
import apiException from 'src/utils/apiException';

@Injectable()
export class CpfsService {
  async add(createCpfDto: AddCpfDto) {
    const { cpf } = createCpfDto;
    const cpfExists =  await prisma.cpf.findUnique({ where: { cpf } });
    if (cpfExists) apiException('ConflictException', 'Cpf', 'CPF already exists.');
    return prisma.cpf.create({ data: createCpfDto });
  }

  async findAll() {
    return prisma.cpf.findMany();
  }

  findOne(cpf: string) {
    return `This action returns a #${cpf} cpf`;
  }

  remove(cpf: string) {
    return `This action removes a #${cpf} cpf`;
  }
}
