import { Test, TestingModule } from '@nestjs/testing';
import { CpfsService } from './cpfs.service';

describe('CpfsService', () => {
  let service: CpfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpfsService],
    }).compile();

    service = module.get<CpfsService>(CpfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
