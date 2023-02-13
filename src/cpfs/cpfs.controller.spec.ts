import { Test, TestingModule } from '@nestjs/testing';
import { CpfsController } from './cpfs.controller';
import { CpfsService } from './cpfs.service';

describe('CpfsController', () => {
  let controller: CpfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfsController],
      providers: [CpfsService],
    }).compile();

    controller = module.get<CpfsController>(CpfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
