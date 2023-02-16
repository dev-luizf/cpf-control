import { Module } from '@nestjs/common';
import { CpfsService } from './cpfs.service';
import { CpfsController } from './cpfs.controller';

@Module({
  controllers: [CpfsController],
  providers: [CpfsService],
})
export class CpfsModule {}
