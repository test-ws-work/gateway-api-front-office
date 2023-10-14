import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomerClient } from './clients/customer.client';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomerClient],
  exports: [CustomersService, CustomerClient],
})
export class CustomersModule {}
