import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  getFact() {
    return firstValueFrom(this.httpService.get('https://catfact.ninja/fact'))
  }
}
