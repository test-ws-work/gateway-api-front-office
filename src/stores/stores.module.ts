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
import { AuthModule } from 'src/auth/auth.module';
import { CustomersModule } from 'src/customers/customers.module';
import { LogistsModule } from 'src/logists/logists.module';

@Module({
  imports: [AuthModule, CustomersModule, LogistsModule],
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
