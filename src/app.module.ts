import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './routes/auth/auth.module'
import { CatsModule } from './routes/cats/cats.module';

@Module({
  imports: [AuthModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
