import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackModule } from './pack/pack.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, PackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
