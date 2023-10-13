import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { StoreClient } from './clients/store.client';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductClient } from './clients/product.client';
import { SalesController } from './controllers/sales.controller';
import { SaleService } from './services/sales.service';
import { SaleClient } from './clients/sale.client';

@Module({
  controllers: [StoresController, ProductsController, SalesController],
  providers: [
    StoresService,
    StoreClient,
    ProductsService,
    ProductClient,
    SaleService,
    SaleClient,
  ],
})
export class StoresModule {}
