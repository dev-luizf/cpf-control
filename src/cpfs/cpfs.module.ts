import { Module } from '@nestjs/common';
import { CpfsService } from './cpfs.service';
import { CpfsController } from './cpfs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CpfsController],
  providers: [CpfsService],
})
export class CpfsModule {}
