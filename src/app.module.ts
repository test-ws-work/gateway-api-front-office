import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), StoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
