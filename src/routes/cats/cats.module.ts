import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { CatsService } from './cats.service'
import { CatsController } from './cats.controller'

@Module({
  imports: [HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
