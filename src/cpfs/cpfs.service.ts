import { Injectable } from '@nestjs/common';
import { AddCpfDto } from './dto/create-cpf.dto';
import { prisma } from 'src/prisma';
import apiException from 'src/utils/apiException';

@Injectable()
export class CpfsService {
  async add(createCpfDto: AddCpfDto) {
    const { cpf } = createCpfDto;
    const cpfExists = await prisma.cpf.findUnique({ where: { cpf } });
    if (cpfExists)
      apiException('ConflictException', 'Cpf', 'CPF already exists.');
    return prisma.cpf.create({ data: createCpfDto });
  }

  async findAll() {
    return prisma.cpf.findMany();
  }

  async verifyIfCpfExists(cpf: string) {
    const cpfExists = await prisma.cpf.findUnique({ where: { cpf } });
    if (!cpfExists) apiException('NotFoundException', 'Cpf', 'CPF not found.');
    return cpfExists;
  }

  async findOne(cpf: string) {
    return this.verifyIfCpfExists(cpf);
  }

  async remove(cpf: string) {
    await this.verifyIfCpfExists(cpf);
    await prisma.cpf.delete({ where: { cpf } });
  }
}
