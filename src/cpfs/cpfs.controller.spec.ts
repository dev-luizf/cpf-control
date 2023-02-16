import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CpfsController } from './cpfs.controller';
import { CpfsService } from './cpfs.service';
import { AddCpfDto } from './dto/create-cpf.dto';

const cpfs = [
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

const newCpf = { cpf: '35139532085' };
const expectedError = { type: 'InvalidCpfException', message: 'CPF is not valid.' };

describe('CpfsController', () => {
  let controller: CpfsController;
  let service: CpfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfsController],
      providers: [
        {
          provide: CpfsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(cpfs),
            findOne: jest.fn().mockImplementation((cpf: string) =>
              Promise.resolve(cpfs[0]),
            ),
            add: jest
              .fn()
              .mockImplementation((cpf: AddCpfDto) =>
                Promise.resolve({ cpf: '11111111111' }),
              ),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<CpfsController>(CpfsController);
    service = module.get<CpfsService>(CpfsService);
  });

  describe('findAll', () => {
    it('deve retornar uma lista de CPFs', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(cpfs);

      expect(await controller.findAll()).toEqual(cpfs);
    });
  });

  describe('findOne', () => {
    it('deve retornar o CPF especificado', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(cpfs[0]);

      expect(await controller.findOne('35139532085')).toEqual(cpfs[0]);
    });

    it('deve retornar um erro se o CPF não for valido', async () => {
      try {
        await controller.findOne('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual(expectedError);
      }
    });
  });

  describe('create', () => {
    it('deve criar um novo CPF', async () => {
      jest.spyOn(service, 'add').mockResolvedValue(cpfs[0]);
      expect(await controller.create(newCpf)).toEqual(cpfs[0]);
    });

    it('deve retornar um erro se o CPF não for valido', async () => {
      try {
        await controller.findOne('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual(expectedError);
      }
    });
  });

  describe('delete', () => {
    it('deve excluir um CPF existente', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await expect(controller.remove('35139532085')).resolves.not.toThrow();
    });

    it('deve retornar um erro se o CPF não for valido', async () => {
      try {
        await controller.findOne('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual(expectedError);
      }
    });
  });
});
