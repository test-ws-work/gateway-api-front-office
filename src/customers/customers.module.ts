import { Module, forwardRef } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomerClient } from './clients/customer.client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerClient],
  exports: [CustomersService, CustomerClient],
})
export class CustomersModule {}
