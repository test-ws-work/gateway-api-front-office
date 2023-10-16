import { Module, forwardRef } from '@nestjs/common';
import { LogistsService } from './services/logists.service';
import { LogistsController } from './controllers/logists.controller';
import { LogistClient } from './clients/logist.client';
import { AuthModule } from 'src/auth/auth.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => CustomersModule)],
  controllers: [LogistsController],
  providers: [LogistsService, LogistClient],
  exports: [LogistsService],
})
export class LogistsModule {}
