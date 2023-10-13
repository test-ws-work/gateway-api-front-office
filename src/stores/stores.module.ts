import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { StoreClient } from './clients/store.client';

@Module({
  controllers: [StoresController],
  providers: [StoresService, StoreClient],
})
export class StoresModule {}
