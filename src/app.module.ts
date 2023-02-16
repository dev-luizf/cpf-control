import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfsModule } from './cpfs/cpfs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CpfsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
