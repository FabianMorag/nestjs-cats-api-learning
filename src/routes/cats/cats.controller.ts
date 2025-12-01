import { Controller, Get, UseGuards } from '@nestjs/common'
import { CatsService } from './cats.service'
import { AuthGuard } from 'src/routes/auth/guard/auth/auth.guard'

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getFact() {
    return this.catsService.getFact()
  }
}
