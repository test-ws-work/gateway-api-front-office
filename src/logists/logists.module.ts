import { Module } from '@nestjs/common';
import { LogistsService } from './services/logists.service';
import { LogistsController } from './controllers/logists.controller';
import { LogistClient } from './clients/logist.client';

@Module({
  controllers: [LogistsController],
  providers: [LogistsService, LogistClient],
})
export class LogistsModule {}
