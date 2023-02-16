import { Injectable } from '@nestjs/common';
import { AddCpfDto } from './dto/create-cpf.dto';
import apiException from 'src/utils/apiException';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CpfsService {
  constructor(private prisma: PrismaService) {}

  async add(createCpfDto: AddCpfDto) {
    const { cpf } = createCpfDto;
    const cpfExists = await this.prisma.cpf.findUnique({ where: { cpf } });
    if (cpfExists)
      apiException('ConflictException', 'Cpf', 'CPF already exists.');
    return this.prisma.cpf.create({ data: createCpfDto });
  }

  async findAll() {
    return this.prisma.cpf.findMany();
  }

  async verifyIfCpfExists(cpf: string) {
    const cpfExists = await this.prisma.cpf.findUnique({ where: { cpf } });
    if (!cpfExists) apiException('NotFoundException', 'Cpf', 'CPF not found.');
    return cpfExists;
  }

  async findOne(cpf: string) {
    return this.verifyIfCpfExists(cpf);
  }

  async remove(cpf: string) {
    await this.verifyIfCpfExists(cpf);
    await this.prisma.cpf.delete({ where: { cpf } });
  }
}
