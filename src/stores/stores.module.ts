import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { StoreClient } from './clients/store.client';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductClient } from './clients/product.client';

@Module({
  controllers: [StoresController, ProductsController],
  providers: [StoresService, StoreClient, ProductsService, ProductClient],
})
export class StoresModule {}
