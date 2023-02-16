import { Test } from '@nestjs/testing';
import { CpfsService } from './cpfs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

const cpfsList = [
  {
    cpf: '11111111111',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cpf: '11111111112',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const cpf = '11111111111';
const newCpf = { cpf };
const conflictError = {
  type: 'ExistsCpfException',
  message: 'CPF already exists.',
};
const notFoundError = {
  type: 'NotFoundCpfException',
  message: 'CPF not found.',
};

describe('CpfsService', () => {
  let cpfsService: CpfsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CpfsService,
        {
          provide: PrismaService,
          useValue: {
            cpf: {
              findMany: jest.fn().mockResolvedValue(cpfsList),
              findUnique: jest
                .fn()
                .mockImplementation(() => Promise.resolve(cpfsList[0])),
              create: jest
                .fn()
                .mockImplementation(() => Promise.resolve(cpfsList[0])),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    cpfsService = moduleRef.get<CpfsService>(CpfsService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('add', () => {
    it('deve retornar um novo cpf', async () => {
      jest.spyOn(prisma.cpf, 'findUnique').mockResolvedValue(null);
      const createdCpf = await cpfsService.add(newCpf);
      expect(createdCpf.cpf).toEqual(cpf);
    });

    it('deve retornar um erro se o CPF já existe', async () => {
      try {
        await cpfsService.add(newCpf);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response).toEqual(conflictError);
      }
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de cpfs', async () => {
      const cpfs = await cpfsService.findAll();
      expect(Array.isArray(cpfs)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('deve retornar um cpf se existir', async () => {
      const result = await cpfsService.findOne(cpf);
      expect(result.cpf).toEqual(newCpf.cpf);
    });

    it('deve retornar um erro se o CPF não for encontrado', async () => {
      jest.spyOn(prisma.cpf, 'findUnique').mockResolvedValue(null);

      try {
        await cpfsService.findOne(cpf);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response).toEqual(notFoundError);
      }
    });
  });

  describe('remove', () => {
    it('deve remover um cpf se existir', async () => {
      await expect(cpfsService.remove(cpf)).resolves.not.toThrow();
    });

    it('deve retornar um erro se o CPF não for encontrado', async () => {
      jest.spyOn(prisma.cpf, 'findUnique').mockResolvedValue(null);

      try {
        await cpfsService.remove(cpf);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response).toEqual(notFoundError);
      }
    });
  });
});
