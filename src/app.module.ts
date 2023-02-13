import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfsModule } from './cpfs/cpfs.module';

@Module({
  imports: [CpfsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
